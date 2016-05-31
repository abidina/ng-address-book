app.controller("AddressEditCtrl", function($scope, $location, $routeParams, addressStorage) {
  $scope.title = "Edit Address";
  $scope.submitButtonText = "Update";
  $scope.newAddress = {};

  addressStorage.getSingleAddress($routeParams.addressId)
    .then(function successCallback(response) {
      $scope.newAddress=response;
    });

  $scope.addNewAddress = function() {
    addressStorage.updateAddress($routeParams.addressId, $scope.newAddress)
      .then(function successCallback(response) {
        $location.url("/addresses/list");
      });
  };

});