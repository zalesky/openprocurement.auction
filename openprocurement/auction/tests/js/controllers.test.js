describe('auctionTest', function () {

  beforeEach(module('auction'));

  var controller, scope, AuctionUtils;

  beforeEach(inject(function(_$controller_, _$rootScope_, AuctionUtils){
    scope = _$rootScope_;
    controller = _$controller_('AuctionController', {$scope: scope, AuctionUtils: AuctionUtils});
  }));

//$scope.post_bid
  it('should be Defined', function () {
    expect(scope.post_bid).toBeDefined();
  });

  it('should push alerts', function () {
    let length = scope.alerts.length;
    scope.form.bid = -1;
    expect(!!scope.post_bid()).toEqual(false);
    expect(scope.alerts.length).toEqual(length + 1);
  });

  it('should do bid if form is valid', function () {
    scope.form.BidsForm = {};
    scope.form.BidsForm.$valid = true;
    scope.minimal_bid.amount = 2;
    scope.post_bid(2);
    expect(scope.alerts.length).toEqual(length + 1);
  });
//$scope.edit_bid
    it('should be Defined', function () {
      expect(scope.edit_bid).toBeDefined();
    });
//$scope.max_bid_amount
    it('should be Defined', function () {
      expect(scope.max_bid_amount).toBeDefined();
    });
//$scope.calculate_minimal_bid_amount
    it('should be Defined', function () {
      expect(scope.calculate_minimal_bid_amount).toBeDefined();
    });
//$scope.start_sync
    it('should be Defined', function () {
      expect(scope.start_sync).toBeDefined();
    });
//$scope.start_auction_process
    it('should be Defined', function () {
      expect(scope.start_auction_process).toBeDefined();
    });
//$scope.restart_changes
    it('should be Defined', function () {
      expect(scope.restart_changes).toBeDefined();
    });
//$scope.replace_document
    it('should be Defined', function () {
      expect(scope.replace_document).toBeDefined();
    });
//$scope.calculate_rounds
    it('should be Defined', function () {
      expect(scope.calculate_rounds).toBeDefined();
    });
//$scope.scroll_to_stage
    it('should be Defined', function () {
      expect(scope.scroll_to_stage).toBeDefined();
    });

//$scope.array
    it('should be Defined', function () {
      expect(scope.array).toBeDefined();
    });
//$scope.open_menu
    it('should be Defined', function () {
      expect(scope.open_menu).toBeDefined();
    });
//$scope.calculate_bid_temp
    it('should be Defined', function () {
      expect(scope.calculate_bid_temp).toBeDefined();
    });
//$scope.calculate_full_price_temp
    it('should be Defined', function () {
      expect(scope.calculate_full_price_temp).toBeDefined();
    });
//$scope.set_bid_from_temp
    it('should be Defined', function () {
      expect(scope.set_bid_from_temp).toBeDefined();
    });



//TODO angular.module('auction').controller('OffCanvasController'


//$scope.restart_changes
    it('should be Defined', function () {
      expect(scope.post_bid).toBeDefined();
    });
//$scope.replace_document
    it('should be Defined', function () {
      expect(scope.post_bid).toBeDefined();
    });
//$scope.calculate_rounds
    it('should be Defined', function () {
      expect(scope.post_bid).toBeDefined();
    });
//$scope.post_bid
    it('should be Defined', function () {
      expect(scope.post_bid).toBeDefined();
    });

//$scope.edit_bid
    it('should be Defined', function () {
      expect(scope.post_bid).toBeDefined();
    });
//$scope.max_bid_amount
    it('should be Defined', function () {
      expect(scope.post_bid).toBeDefined();
    });
//$scope.calculate_minimal_bid_amount
    it('should be Defined', function () {
      expect(scope.post_bid).toBeDefined();
    });
//$scope.start_sync
    it('should be Defined', function () {
      expect(scope.post_bid).toBeDefined();
    });
//$scope.start_auction_process
    it('should be Defined', function () {
      expect(scope.post_bid).toBeDefined();
    });
//$scope.restart_changes
    it('should be Defined', function () {
      expect(scope.post_bid).toBeDefined();
    });
//$scope.replace_document
    it('should be Defined', function () {
      expect(scope.post_bid).toBeDefined();
    });
//$scope.calculate_rounds
    it('should be Defined', function () {
      expect(scope.post_bid).toBeDefined();
    });




});



/*describe('AuctionController', function() {
    var scope, $location, createController;

    beforeEach(inject(function ($rootScope, $controller _$location_) {
        $location = _$location_;
        scope = $rootScope.$new();

        createController = function() {
            return $controller('AuctionController', {
                '$scope': scope
            });
        };
    }));

    it('should have a method to check if the path is active', function() {
        var controller = createController();
        console.log(scope);
        $location.path('/about');
        expect($location.path()).toBe('/about');
        expect(scope.isActive('/about')).toBe(true);
        expect(scope.isActive('/contact')).toBe(false);
    });
});*/