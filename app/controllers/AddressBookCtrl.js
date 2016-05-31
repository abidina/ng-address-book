app.controller("AddressBookCtrl", function($scope) {
  $scope.showListView = true;
  $scope.address= "";
  $scope.newAddress = {};

  $scope.addresses= [
      {
        id: 0,
        name:"James",
        phone:"(123) 234-3456",
        location:"Nashville, TN",
        isContacted:false,
      },
      {
        id: 1,
        name:"Josh",
        phone:"(123) 234-3456",
        location:"Nashville, TN",
        isContacted:false,
      },  
      {
        id: 2,
        name:"Anna",
        phone:"(123) 234-3456",
        location:"Nashville, TN",
        isContacted:false,      }
    ];

    $scope.newAddress = function() {
      $scope.showListView = false;
    };

    $scope.allAddresses = function() {
      $scope.showListView = true;
    };

    $scope.addNewAddress = function(){
      $scope.newAddress.isCompleted = false;
      $scope.newAddress.id = $scope.addresses.length;
      $scope.addresses.push($scope.newAddress);
      $scope.newAddress = "";
    };


});
