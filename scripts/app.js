'use strict';

// Declare app level module which depends on filters, and services
angular.module('whatToDo', [
    'ngRoute',
    'whatToDo.filters',
    'whatToDo.services',
    'whatToDo.directives',
    'whatToDo.controllers'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeController'});
    $routeProvider.when('/app', {templateUrl: 'partials/app.html', controller: 'AppController'});
    $routeProvider.when('/contact', {templateUrl: 'partials/contact.html', controller: 'HomeController'});
    
    $routeProvider.otherwise({redirectTo: '/home'});
}]);