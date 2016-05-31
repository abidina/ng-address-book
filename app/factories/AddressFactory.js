app.factory("addressStorage", function($q, $http, firebaseURL, AuthFactory) {
  var getAddressList = function() {
    var addresses = [];
    let user = AuthFactory.getUser();
    return $q(function (resolve, reject) {
      // $http.get(`${firebaseURL}addresses.json?orderBy="uid"&equalTo=${user.uid}`)       
      // $http.get(firebaseURL + 'addresses.json?orderBy=' + uid + '&equalTo=' + user.uid)
      $http.get(`${firebaseURL}items.json?orderBy="uid"&equalTo="${user.uid}"`) 
        .success(function(addressObject) {
          var addressCollection = addressObject;
          Object.keys(addressCollection).forEach(function(key) {
            addressCollection[key].id=key;
            addresses.push(addressCollection[key]); 
          });
          resolve(addresses);
        })
        .error(function(error) {
          reject(error);
        });     
    });
  };

var deleteAddress = function(addressId){
        return $q(function(resolve, reject){
            $http
                .delete(firebaseURL + "addresses/" + addressId + ".json")
                .success(function(objectFromFirebase){
                    resolve(objectFromFirebase);
                });
        });
    };

var postNewAddress = function(newAddress){
    let user = AuthFactory.getUser();
    console.log("user", user);
    return $q(function(resolve, reject) {
        $http.post(
            firebaseURL + "addresses.json",
            JSON.stringify({
                name: newAddress.name,
                phone: newAddress.phone,
                location: newAddress.location,
                isContacted: newAddress.isContacted,
                uid: user.uid
            })
        )
        .success(
            function(objectFromFirebase) {
                resolve(objectFromFirebase);
            }
        );
    });
};

var getSingleAddress = function(addressId){
    return $q(function(resolve, reject){
        $http.get(firebaseURL + "addresses/"+ addressId +".json")
            .success(function(addressObject){
                resolve(addressObject);
            })
            .error(function(error){
                reject(error);
            });
    });
};

var updateAddress = function(addressId, newAddress){
    let user = AuthFactory.getUser();
    return $q(function(resolve, reject) {
        $http.put(
            firebaseURL + "addresses/" + addressId + ".json",
            JSON.stringify({
                name: newAddress.name,
                phone: newAddress.phone,
                location: newAddress.location,
                isContacted: newAddress.isContacted,
                uid: user.uid
            })
        )
        .success(
            function(objectFromFirebase) {
                resolve(objectFromFirebase);
            }
        );
    });
};

var updateCompletedStatus = function(newAddress) {
    return $q(function(resolve, reject) {
        $http.put(
            firebaseURL + "addresses/" + newAddress.id + ".json",
            JSON.stringify({
                name: newAddress.name,
                phone: newAddress.phone,
                location: newAddress.location,
                isContacted: newAddress.isContacted,
            })
        )
        .success(
            function(objectFromFirebase) {
                resolve(objectFromFirebase);
            }
        );
    });
};




return {updateAddress:updateAddress, getSingleAddress:getSingleAddress, getAddressList:getAddressList, deleteAddress:deleteAddress, postNewAddress:postNewAddress, updateCompletedStatus:updateCompletedStatus};

});