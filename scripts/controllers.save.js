'use strict';

/* Controllers */

angular.module('whatToDo.controllers', ['$scope']).
controller('AppController', [function($scope) {
    
    $scope.data = [];
    $scope.items = [];
        
    $scope.canvas = null;
    $scope.context = null;
    $scope.chart = null;
    
    // Colors from http://flatuicolors.com/
    $scope.colors = ['#1abc9c', '#f1c40f', '#2ecc71', '#e67e22', '#3498db', '#e74c3c', '#9b59b6', '#bdc3c7', '#34495e'];
    $scope.nextColor = 0;
    
    $scope.init = function(inputCanvas) {           
        canvas = document.getElementById(inputCanvas);
        context = canvas.getContext("2d");
    };
    
    $scope.getRandom = function(max) {
        return Math.floor(Math.random() * max);
    };
    
    $scope.addChoices = function(inputData) {
        //
        
        
        data = data.concat(inputData);
        items = [];
        
        var size = 100 / data.length;
        for (var item in data) {
            nextColor = ( ++nextColor == colors.length) ? 0 : nextColor;
            
            var newItem = {};
            newItem.value = size;
            newItem.color = colors[nextColor];
            
            items.push(newItem);
        }
        
        chart = new Chart(context).Doughnut(items);
    }; 
    
    $scope.randomize = function() {
        var degrees = 0;
        var rotationTimes = getRandom(items.length) * 5;
        var counterTimes = 0;
        var step = getRandom(360*rotationTimes);
        var speed = 500;
        
        
        degrees += step;
        var rotation = 'rotate(' + degrees + 'deg)';
        
        canvas.style.MozTransform = rotation; //For Bankin :)
        canvas.style.webkitTransform = rotation;
    };
    
    var data = ["House M.D", "LOST", "Heroes", "Monk", "Some other choice", ":@:@:@"];
    $scope.init('canvas');
    $scope.addChoices(data);
    
}])
.controller('MyCtrl1', [function() {

}])
.controller('MyCtrl2', [function() {

}]);
