'use strict';

// Declare app level module which depends on filters, and services
angular.module('whatToDo', [
    'ui.router',
    'whatToDo.filters',
    'whatToDo.services',
    'whatToDo.directives',
    'whatToDo.controllers',
    'firebase'
])
// config(['$routeProvider', function($routeProvider) {
//     $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeController'});
//     $routeProvider.when('/app', {templateUrl: 'partials/app.html', controller: 'AppController'});
//     $routeProvider.when('/contact', {templateUrl: 'partials/contact.html', controller: 'HomeController'});
    
//     $routeProvider.otherwise({redirectTo: '/home'});
// }])




.run(
  ['$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
  ]
)

.config(
  ['$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

      /////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////
      ///
      $urlRouterProvider.otherwise('/');

      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider
        .state("app", {

          url: "/",
          templateUrl: './partials/home.html',
        })
        .state("contacts", {

          url: "/contacts",
          templateUrl: './partials/contacts.html'
        });

    }
  ]
);