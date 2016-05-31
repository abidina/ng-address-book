app.controller("AddressNewCtrl", function($scope, $location, addressStorage) {
  $scope.title = "New Address";
  $scope.submitButtonText = "Add New Address";

  $scope.newAddress = {
    name:"",
    phone:"",
    location:"",
    isContacted:false,
    uid:""
  };



  $scope.addNewAddress = function(){
    addressStorage.postNewAddress($scope.newAddress)
      .then(function successCallback(response) {
        $location.url("/addresses/list");
      });
  };

});