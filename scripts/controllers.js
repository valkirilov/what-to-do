'use strict';

/* Controllers */

angular.module('whatToDo.controllers', []).
controller('HomeController', [function() {

}])
.controller('AppController', ['$scope', function($scope) {
    
    
    
    $scope.data = [];
    $scope.items = [];
    $scope.askButton = false;
    $scope.askResult = false;
    $scope.divResult = angular.element(document.getElementById('divResult'));
    $scope.rotateInterval = null;
        
    $scope.canvas = null;
    $scope.context = null;
    $scope.chart = null;
    
    // Colors from http://flatuicolors.com/
    $scope.colors = ['#1abc9c', '#f1c40f', '#2ecc71', '#e67e22', '#3498db', '#e74c3c', '#9b59b6', '#bdc3c7', '#34495e'];
    $scope.nextColor = 0;
    
    $scope.musicRotate = null;
    $scope.musicFinish = null;
    $scope.soundRotate = "./sounds/start.wav";
    $scope.soundFinish = "./sounds/end.wav";
    
    $scope.init = function(inputCanvas) {           
        $scope.canvas = document.getElementById(inputCanvas);
        $scope.context = canvas.getContext("2d");
        
        // Init music
        $scope.musicRotate = new Audio();
        $scope.musicFinish = new Audio();
        //$scope.musicRotate.setAttribute('loop', 'loop');
        $scope.musicRotate.setAttribute('preload', 'auto');
        $scope.musicFinish.setAttribute('preload', 'auto');
    
        $scope.musicRotate.setAttribute('src', $scope.soundRotate);
        $scope.musicFinish.setAttribute('src', $scope.soundFinish);
        $scope.musicRotate.load();
        $scope.musicFinish.load();
    };
    
    $scope.getRandom = function(max) {
        return Math.floor(Math.random() * max);
    };
    
    $scope.contains = function(array, item) {
        for (var i in array)
            if (array[i] === item)
                return true;
        return false;
    }
    
    $scope.addChoice = function() {
        
        if ($scope.newChoice === undefined || $scope.newChoice.length === 0)
            return;
        
        if (!$scope.contains($scope.data, $scope.newChoice)) {
            var newItem = { id:$scope.data.length+1, name:$scope.newChoice };
            $scope.data.push(newItem);
            $scope.newChoice = "";
            $scope.addChoices();
            
            $scope.askButton = true;
            $scope.askResult = false;
        }
        else {
            alert('Already added.');
        }
        
        
    };
    
    $scope.addChoices = function() {
        
        $scope.items = [];
        
        var size = 100 / $scope.data.length;
        for (var item in $scope.data) {
            $scope.nextColor = ( ++$scope.nextColor == $scope.colors.length) ? 0 : $scope.nextColor;
            
            var newItem = {};
            newItem.value = size;
            newItem.color = $scope.colors[$scope.nextColor];
            newItem.name = $scope.data[item];
            
            $scope.items.push(newItem);
        }
        
        $scope.chart = new Chart($scope.context).Doughnut($scope.items);
    };
    
    $scope.randomize = function() {        
        var degrees = 0;
        var rotationTimes = $scope.getRandom($scope.items.length) * 5;
        var counterTimes = 0;
        var step = $scope.getRandom(360*rotationTimes)+360;
        var speed = 500;
        
        degrees += step;
        var rotation = 'rotate(' + degrees + 'deg)';
        
        $scope.canvas.style.MozTransform = rotation; //For Bankin :)
        $scope.canvas.style.webkitTransform = rotation;
        
        $scope.askButton = false;
        $scope.askResult = true;
        
        // Play the music and load the next sound
        $scope.musicRotate.play();
        
        var colorIndex = 0;
        $scope.rotateInterval = setInterval(function() {
            colorIndex = (colorIndex >= $scope.items.length) ? 0 : colorIndex;
            
            var resultStyle = $scope.items[colorIndex].color;
            $scope.divResult.css('background-color', resultStyle);
            colorIndex++;
        }, 500);
        
        setTimeout(function() {
            $scope.musicFinish.play();
            clearInterval($scope.rotateInterval);
            
            // Choose the winner
            var resultIndex = $scope.getRandom($scope.data.length);
            $scope.divResult.text(resultIndex+1);
            var resultStyle = $scope.items[resultIndex].color;
            $scope.divResult.css('background-color', resultStyle);
            
        }, 5000);
    };
    
    var newData = ["House M.D", "LOST", "Heroes", "Monk", "Some other choice", ":@:@:@", "House M.D", "LOST", "Heroes", "Monk", "Some other choice", ":@:@:@", "House M.D", "LOST", "Heroes", "Monk", "Some other choice", ":@:@:@"];
    $scope.init('canvas');
    //$scope.addChoices(newData);
}])
.controller('MyCtrl1', [function() {

}])
.controller('MyCtrl2', [function() {

}]);
