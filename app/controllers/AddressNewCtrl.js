app.controller("AddressNewCtrl", function($scope, $http, $location, addressStorage) {
  $scope.title = "New Address";
  $scope.submitButtonText = "Add New Address";

  $scope.newTask = {
    name:"",
    phone:"",
    location:"",
    isContacted:false,
  };



  $scope.addNewAddress = function(){
    addressStorage.postNewAddress($scope.newTask)
      .then(function successCallback(response) {
        $location.url("/addresses/list");
      });
  };

});