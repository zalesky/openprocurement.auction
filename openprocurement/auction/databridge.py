import argparse
import logging
import logging.config
import requests
import ConfigParser
import os
from time import sleep
from urlparse import urljoin
from redis import Redis
from circus.client import CircusClient
from datetime import datetime
from pytz import timezone

import iso8601


logger = logging.getLogger(__name__)


def hook(watcher, arbiter, hook_name, **kwargs):
    logger.info("remove watcer {}".format(watcher.name))
    watcher = arbiter._watchers_names.pop(watcher.name)
    del arbiter.watchers[arbiter.watchers.index(watcher)]
    return True


class AuctionsDataBridge(object):
    """docstring for AuctionsDataBridge"""
    def __init__(self, config):
        super(AuctionsDataBridge, self).__init__()
        self.config = config
        self.tenders_url = urljoin(
            self.config_get('tenders_api_server'),
            '/api/{}/tenders'.format(
                self.config_get('tenders_api_version')
            )
        )
        self.tz = timezone('Europe/Kiev')
        self.couch_url = urljoin(self.config_get('couch_url'), self.config_get('auctions_db'))
        self.current_worker_port = int(self.config_get('starts_port'))
        self.mapings = Redis.from_url(self.config_get('redis_url'))
        self.circus_client = CircusClient(endpoint=self.config_get('circus_endpoint'))
        self.url = self.tenders_url

    def config_get(self, name):
        return self.config.get('main', name)

    def tender_url(self, tender_id):
        return urljoin(self.tenders_url, 'tenders/{}/auction'.format(tender_id))

    def get_teders_list(self):
        self.offset = ''
        while True:
            params = {'offset': self.offset, 'opt_fields': 'status,auctionPeriod'}
            logger.debug('Start request to {}, params: {}'.format(
                self.url, params))
            response = requests.get(self.url, params=params)

            logger.debug('Request response: {}'.format(response.status_code))
            if response.ok:
                response_json = response.json()
                if len(response_json['data']) == 0:
                    logger.info("Change offset date to {}".format(response_json['next_page']['offset']))
                    self.offset = response_json['next_page']['offset']
                    break
                for item in response_json['data']:
                    if 'auctionPeriod' in item \
                            and 'startDate' in item['auctionPeriod'] \
                            and not item['auctionPeriod']['endDate'] \
                            and item['status'] == "auction":
                        
                        date = iso8601.parse_date(item['auctionPeriod']['startDate'])
                        date = date.astimezone(self.tz)
                        if datetime.now(self.tz) > date:
                            continue

                        yield item

    def start_auction_worker(self, tender_item):
        self.mapings.set(tender_item['id'], "http://localhost:{}/".format(self.current_worker_port))
        logger.info(self.circus_client.call(
            {
                "command": "add",
                "properties": {
                    "cmd": self.config_get('auction_worker'),
                    "args": '{} {} {}'.format(tender_item['id'],
                                              self.current_worker_port,
                                              self.couch_url),
                    "name": "auction_worker_{}".format(tender_item['id']),
                    "start": True,
                    "options": {
                        "shell": True,
                        "hooks": {
                            "after_stop": ("openprocurement.auction.databridge.hook",
                                           True)
                        },
                        "respawn": False,
                        "stdout_stream": {
                            "class": "StdoutStream"
                        },
                        "stderr_stream": {
                            "class": "StdoutStream"
                        }
                    }
                }
            }
        ))
        self.current_worker_port += 1

    def run(self):
        logger.info('Start Auctions Bridge')
        while True:
            logger.info('Start data sync...')
            for tender_item in self.get_teders_list():
                logger.debug('Item {}'.format(tender_item))
                self.start_auction_worker(tender_item)
                sleep(3)
            logger.info('Wait...')
            sleep(300)


def main():
    parser = argparse.ArgumentParser(description='---- Auctions Bridge ----')
    parser.add_argument('config', type=str, help='Path to configuration file')
    params = parser.parse_args()
    if os.path.isfile(params.config):
        logging.config.fileConfig(params.config)
        config = ConfigParser.ConfigParser()
        config.read(params.config)
        AuctionsDataBridge(config).run()


##############################################################

if __name__ == "__main__":
    main()
