app.controller("AddressViewCtrl", function($scope, $routeParams, addressStorage) {
  $scope.selectedAddress = {};

  addressStorage.getSelectedAddress($routeParams.itemId).then(function(response) {
    $scope.selectedAddress = response;
  });
  
});