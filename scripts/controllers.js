'use strict';

/* Controllers */

// todo
// removing element
// fix bug on iOS
// test on firefox

angular.module('whatToDo.controllers', []).
controller('HomeController', [function() {

}])
.controller('AppController', ['$scope', function($scope) {
    
    $scope.data = [];
    $scope.items = [];
    $scope.askButton = false;
    $scope.askResult = false;
    $scope.divResult = angular.element(document.getElementById('divResult')); // This is the circle with the numer
    $scope.divAnswer = angular.element(document.getElementById('divAnswer')); // This is the box with the info
    $scope.rotateInterval = null;
        
    $scope.canvas = null;
    $scope.context = null;
    $scope.chart = null;
    $scope.canvasSize = null; // Because of the problesm on the iPads
    
    // Colors from http://flatuicolors.com/
    $scope.colors = ['#1abc9c', '#f1c40f', '#2ecc71', '#e67e22', '#3498db', '#e74c3c', '#9b59b6', '#bdc3c7', '#34495e'];
    $scope.nextColor = 0;
    
    $scope.musicRotate = null;
    $scope.musicFinish = null;
    $scope.soundRotate = "./sounds/start.wav";
    $scope.soundFinish = "./sounds/end.wav";
    
    $scope.init = function(inputCanvas) {           
        $scope.canvas = document.getElementById(inputCanvas);
        $scope.context = $scope.canvas.getContext("2d");
        $scope.canvasSize =  { width: $scope.canvas.width, height: $scope.canvas.height };
        
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
    
    $scope.removeChoice = function(choice) {    
        var index = -1;
        for (var ind in $scope.data) {
            if ($scope.data[ind].name === choice.name)
                index = ind;
        }        

        $scope.data.splice(index, 1);
        $scope.items.splice(index, 1);
        
        $scope.askButton = true;
        $scope.prepareChoices();
        $scope.drawChart({animateRotate : false, animateScale : true});
    };
    
    $scope.removeAll = function() {
        console.log('Clear');
        
        for (var i in $scope.data) {
            $scope.removeChoice($scope.data[i]);
        }
        $scope.data = new Array();
        $scope.index = new Array();
    };
    
        
    $scope.addChoice = function() {
        
        if ($scope.newChoice === undefined || $scope.newChoice.length === 0)
            return;
        
        if (!$scope.contains($scope.data, $scope.newChoice)) {
            var newItem = { id:$scope.data.length+1, name:$scope.newChoice };
            $scope.data.push(newItem);
            $scope.newChoice = "";
            $scope.prepareChoices();
            
            $scope.askButton = true;
            $scope.askResult = false;
            
            $scope.changeAnswerDivVisibility();
        }
        else {
            alert('Already added.');
        }
    };
    
    $scope.prepareChoices = function() {
        
        $scope.items = [];
        
        $scope.nextColor = 0;
        var size = 100 / $scope.data.length;
        for (var item in $scope.data) {
            $scope.nextColor = ( ++$scope.nextColor == $scope.colors.length) ? 0 : $scope.nextColor;
            
            var newItem = {};
            newItem.value = size;
            newItem.color = $scope.colors[$scope.nextColor];
            newItem.name = $scope.data[item].name;
            newItem.id = $scope.data[item].id;
            
            $scope.items.push(newItem);
        }
        
        $scope.drawChart({animateRotate : false, animateScale : true});
    };
    
    $scope.drawChart = function(options) {
        $scope.canvas.width = $scope.canvasSize.width;
        $scope.canvas.height = $scope.canvasSize.height;
        $scope.chart = new Chart($scope.context).Doughnut($scope.items, options);
    };
    
    $scope.changeAnswerDivVisibility = function(status) {
        if (status === 1) {
            $scope.divAnswer.css('opacity', '1');
            $scope.divAnswer.css('display', 'block');
        }
        else {
            $scope.divAnswer.css('opacity', '0');
            $scope.divAnswer.css('display', 'none');
        }
    };
    
    $scope.randomize = function() {
        
        if ($scope.data.length == 0)
            return;
                
        // Draw the chart
        $scope.drawChart();
        $scope.changeAnswerDivVisibility();
        $scope.showResultCircle('?', '#333333');
        
        var rotationTimes = $scope.getRandom($scope.items.length) * 5;
        var step = $scope.getRandom(360*rotationTimes)+720;
        
        var rotation = 'rotate(' + step + 'deg)';
        
        $scope.canvas.style.MozTransform = rotation;
        $scope.canvas.style.webkitTransform = rotation;
        $scope.canvas.style.transform = rotation;
        
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
            
            // Choose the winner and display it
            var resultIndex = $scope.getRandom($scope.data.length);
            var resultStyle = $scope.items[resultIndex].color;
            var resultId = $scope.items[resultIndex].id;
            $scope.showResultCircle(resultId, resultStyle);
            
            var resultBadge = angular.element(document.getElementById('resultBadge'));
            var resultName = angular.element(document.getElementById('resultName'));
            
            resultBadge.css('background-color', resultStyle);
            resultBadge.text($scope.items[resultIndex].id);
            resultName.text($scope.items[resultIndex].name);
            
            $scope.changeAnswerDivVisibility(1);
        }, 5000);
    };
    
    $scope.showResultCircle = function(result, color) {
        $scope.divResult.text(result);
        $scope.divResult.css('background-color', color);
    };
    
    $scope.init('canvas');
}])
.controller('MyCtrl1', [function() {

}])
.controller('MyCtrl2', [function() {

}]);
