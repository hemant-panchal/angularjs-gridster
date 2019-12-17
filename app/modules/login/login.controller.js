"use strict";

module.exports = function($scope, $location, $state, toaster, LoginService,GENERAL_CONFIG) {
    var vm = this;
    vm.login = login;
    vm.jakob = {};
    vm.jakob.firstName = "Jakob";
    vm.jakob.lastName  = "Jenkov";
    $scope.add_new = {};
    $scope.user1Config = [
        { sizeX: 1, sizeY: 1, row: 0, col: 0 },
        { sizeX: 1, sizeY: 1, row: 0, col: 1 },
        { sizeX: 1, sizeY: 1, row: 0, col: 2 },
        { sizeX: 1, sizeY: 1, row: 0, col: 3 },
        { sizeX: 1, sizeY: 1, row: 1, col: 0 },
        { sizeX: 1, sizeY: 1, row: 1, col: 1 }
    ];

    $scope.user2Config = [
        { sizeX: 1, sizeY: 1, row: 0, col: 0 },
        { sizeX: 2, sizeY: 1, row: 0, col: 1 },
        { sizeX: 2, sizeY: 1, row: 0, col: 3 },
        { sizeX: 1, sizeY: 1, row: 1, col: 0 },
        { sizeX: 1, sizeY: 1, row: 1, col: 1 },
        { sizeX: 1, sizeY: 1, row: 1, col: 2 }
    ];
    $scope.user3Config = [
        { sizeX: 2, sizeY: 1, row: 0, col: 0 },
        { sizeX: 1, sizeY: 1, row: 0, col: 2 },
        { sizeX: 1, sizeY: 1, row: 0, col: 3 },
        { sizeX: 1, sizeY: 1, row: 1, col: 0 },
        { sizeX: 2, sizeY: 1, row: 1, col: 1 },
        { sizeX: 2, sizeY: 1, row: 1, col: 3 }
    ];

    $scope.standardItems = [];

    $scope.gridsterOpts = {
    	pushing: true, // whether to push other items out of the way on move or resize
    	floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
    	swapping: true, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
    	width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
    	colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
    	rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
    	margins: [10, 10], // the pixel distance between each widget
    	outerMargin: true, // whether margins apply to outer edges of the grid
    	sparse: false, // "true" can increase performance of dragging and resizing for big grid (e.g. 20x50)
    	isMobile: false, // stacks the grid items if true
    	mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
    	mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
    	minColumns: 1, // the minimum columns the grid must have
    	minRows: 2, // the minimum height of the grid, in rows
    	maxRows: 100,
    	defaultSizeX: 2, // the default width of a gridster item, if not specifed
    	defaultSizeY: 1, // the default height of a gridster item, if not specified
    	minSizeX: 1, // minimum column width of an item
    	maxSizeX: null, // maximum column width of an item
    	minSizeY: 1, // minumum row height of an item
    	maxSizeY: null, // maximum row height of an item
    	resizable: {
    	   enabled: true,
    	   handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
    	   start: function(event, $element, widget) {
               // console.log("widget" , widget);
           }, // optional callback fired when resize is started,
    	   resize: function(event, $element, widget) {
               // console.log("widget" , widget);
           }, // optional callback fired when item is resized,
    	   stop: function(event, $element, widget) {
               console.log("widget" , widget);
               console.log("$element" , $element);
           } // optional callback fired when item is finished resizing
    	},
    	draggable: {
    	   enabled: true, // whether dragging items is supported
    	   start: function(event, $element, widget) {
               // console.log("$element" , $element);
           }, // optional callback fired when drag is started,
    	   drag: function(event, $element, widget) {
               // console.log("$element" , $element);
           }, // optional callback fired when item is moved,
    	   stop: function(event, $element, widget) {
               console.log("widget" , widget);
               console.log("$element" , $element);
           } // optional callback fired when item is finished dragging
    	}
    };

    $scope.setActiveUser = function(user){
        $scope.activeUser = user
        if (user == 'user1') {
            $scope.standardItems = $scope.user1Config;
        }else if (user == 'user2') {
            $scope.standardItems = $scope.user2Config;
        }else if (user == 'user3') {
            $scope.standardItems = $scope.user3Config;
        }
    }
    $scope.addNew = function(index, item){
        var newColPos = item.col+1;
        for (var i = 0; i < $scope.standardItems.length; i++) {
            if ($scope.standardItems[i].col == newColPos && $scope.standardItems[i].row == item.row){
                console.log("$scope.standardItems[i]" , $scope.standardItems[i]);
                $scope.standardItems[i].col = ($scope.standardItems[i].col + 1);
            }
        }
        $scope.standardItems.push({ sizeX: 1, sizeY: 1, row: item.row, col: newColPos})
    }

    $scope.remove = function(index, item){
        console.log("item" , item);
        console.log("index" , index);
        // var indexOfItem = null
        // for (var i = 0; i < $scope.standardItems.length; i++) {
        //     if ($scope.standardItems[i].col == item.col && $scope.standardItems[i].row == item.row){
        //         indexOfItem = i;
        //         break;
        //     }
        // }
        // for (var i = 0; i < $scope.standardItems.length; i++) {
        //     if (i >= indexOfItem && $scope.standardItems[i].row == item.row){
        //         $scope.standardItems[i].col = ($scope.standardItems[i].col-1)
        //     }
        // }
        // console.log("indexOfItem", indexOfItem);
        if (index) {
            $scope.standardItems.splice(index,1)
        }


    }

    function login() {}

    console.log("yes");
};
