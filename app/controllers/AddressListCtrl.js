app.controller("AddressListCtrl", function($scope, $location, addressStorage) {
  $scope.addresses= [];

  addressStorage.getAddressList().then(function(addressCollection){
    $scope.addresses = addressCollection;
  });

    $scope.addressDelete= function(addressId) {
      addressStorage.deleteAddress(addressId).then(function(response) {
        addressStorage.getAddressList().then(function(addressCollection){
          $scope.addresses = addressCollection;
        });
      });
    };

    $scope.statusChange = function(address) {
      addressStorage.updatedCompletedStatus(address).then(function(response) {
          console.log(response);
      });
    };

});