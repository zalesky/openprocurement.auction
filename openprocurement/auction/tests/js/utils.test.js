//stringifyQueryString
describe('Unit: Testing AuctionUtils "stringifyQueryString" ', function() {

  it('should be Defined', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.stringifyQueryString).toBeDefined();
  }]));

  it('should return empty string if argument is undefined', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.stringifyQueryString()).toEqual('');
  }]));

  it('should convert object', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.stringifyQueryString({a:1,b:2,c:3})).toEqual('a=1&b=2&c=3');
    expect(AuctionUtils.stringifyQueryString({a:1,b:2})).toEqual('a=1&b=2');
    expect(AuctionUtils.stringifyQueryString({a:1})).toEqual('a=1');
  }]));

  it('should convert object with arrays', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.stringifyQueryString({a:[1,2,3],c:[1,2,3]})).toEqual('a=1&a=2&a=3&c=1&c=2&c=3');
    expect(AuctionUtils.stringifyQueryString({a:[1,2],c:[1,2,3]})).toEqual('a=1&a=2&c=1&c=2&c=3');
    expect(AuctionUtils.stringifyQueryString({a:[1],c:[1,2,3]})).toEqual('a=1&c=1&c=2&c=3');
    expect(AuctionUtils.stringifyQueryString({a:[1],c:[1,2]})).toEqual('a=1&c=1&c=2');
    expect(AuctionUtils.stringifyQueryString({a:[1],c:[1]})).toEqual('a=1&c=1');
  }]));
  it('should encodeURI', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    
    expect(AuctionUtils.stringifyQueryString({'a v':'http://w3schools.com/my test.asp?name=ståle&car=saab'}))
      .toEqual('a%20v=http%3A%2F%2Fw3schools.com%2Fmy%20test.asp%3Fname%3Dst%C3%A5le%26car%3Dsaab');
  }]));
});

//prepare_title_ending_data
describe('Unit: Testing AuctionUtils "prepare_title_ending_data" ', function() {

  it('should be Defined', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.prepare_title_ending_data).toBeDefined();
  }]));

  it('should prepare ru title', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.prepare_title_ending_data(auctionNew, 'ru'))
      .toEqual('UA-2016-10-29-000009-1 - [ТЕСТИРОВАНИЕ] User-centric content-based toolset - КОМУНАЛЬНЕ ПІДПРИЄМСТВО "КИЇВПАСТРАНС"');
  }]));

  it('should prepare en title', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.prepare_title_ending_data(auctionNew, 'en'))
      .toEqual('UA-2016-10-29-000009-1 - [TESTING] Networked heuristic methodology - КОМУНАЛЬНЕ ПІДПРИЄМСТВО "КИЇВПАСТРАНС"');
  }]));




});