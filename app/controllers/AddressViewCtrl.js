app.controller("AddressViewCtrl", function($scope, $routeParams, addressStorage) {
  $scope.items = [];
  $scope.selectedAddress = {};

  addressStorage.getAddressList().then(function(addressCollection) {
    $scope.addresses = addressCollection;

    $scope.selectedAddress = $scope.addresses.filter(function(address) {
      return address.id === $routeParams.addressId;
    })[0];
  })



  // addressStorage.AddressList($routeParams.itemId).then(function(response) {
  //   $scope.selectedAddress = response;
  // });
  
});