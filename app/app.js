var app = angular.module("AddressBookApp", ["ngRoute"])
  .constant("firebaseURL", "https://ng-address-book.firebaseio.com/");


let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if (AuthFactory.isAuthenticated()) {
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
  }
})



app.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl:'partials/address-list.html',
      controller:'AddressListCtrl',
      resolve: {isAuth}
    }).    
    when('/addresses/list', {
      templateUrl:'partials/address-list.html',
      controller:'AddressListCtrl',
      resolve: {isAuth}
    }).
    when('/addresses/new', {
      templateUrl:'partials/address-new.html',
      controller:'AddressNewCtrl',
      resolve: {isAuth}
    }).
    when('/addresses/:addressId', { 
      templateUrl:'partials/address-details.html',
      controller:'AddressViewCtrl',
      resolve: {isAuth}
    }).
    when('/addresses/:addressId/edit', {
      templateUrl:'partials/address-new.html',
      controller:'AddressEditCtrl',
      resolve: {isAuth}
    }).    
    when('/login', { 
      templateUrl:'partials/login.html',
      controller:'LoginCtrl'
    }).    
    when('/logout', { 
      templateUrl:'partials/login.html',
      controller:'LoginCtrl'
    }).
    otherwise('/');
});



app.run(($location) => {
  let todoRef = new Firebase("https://ng-address-book.firebaseio.com/");

  todoRef.onAuth((authData => {
    if (!authData) {
      $location.path("/login");
    }
  }))
})
