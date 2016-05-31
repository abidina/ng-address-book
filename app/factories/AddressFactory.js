app.factory("addressStorage", function($q, $http, firebaseURL, AuthFactory) {
  var getAddressList = function() {
    var addresses = [];
    let user = AuthFactory.getUser();
    return $q(function (resolve, reject) {
      $http.get(`${firebaseURL}addresses.json?orderBy="uid"&equalTo="${user.uid}"`) 
        .success(function(itemObject) {
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

var postNewAddress = function(newItem){
    let user = AuthFactory.getUser();
    console.log("user", user);
    return $q(function(resolve, reject) {
        $http.post(
            firebaseURL + "addresses.json",
            JSON.stringify({
                name: newItem.name,
                phone: newItem.phone,
                location: newItem.location,
                isContacted: newItem.isContacted,
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
            .success(function(itemObject){
                resolve(itemObject);
            })
            .error(function(error){
                reject(error);
            });
    });
};

var updateAddress = function(addressId, newItem){
    let user = AuthFactory.getUser();
    return $q(function(resolve, reject) {
        $http.put(
            firebaseURL + "addresses/" + addressId + ".json",
            JSON.stringify({
                name: newItem.name,
                phone: newItem.phone,
                location: newItem.location,
                isContacted: newItem.isContacted,
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

var updateStatus = function(newItem) {
    return $q(function(resolve, reject) {
        $http.put(
            firebaseURL + "addresses/" + newItem.id + ".json",
            JSON.stringify({
                name: newItem.name,
                phone: newItem.phone,
                location: newItem.location,
                isContacted: newItem.isContacted,
                // uid: user.uid
            })
        )
        .success(
            function(objectFromFirebase) {
                resolve(objectFromFirebase);
            }
        );
    });
};




return {updateAddress:updateAddress, getSingleAddress:getSingleAddress, getAddressList:getAddressList, deleteAddress:deleteAddress, postNewAddress:postNewAddress, updateStatus:updateStatus};

});