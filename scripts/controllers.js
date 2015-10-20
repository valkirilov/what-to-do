'use strict';

/* Controllers */

// todo
// removing element
// fix bug on iOS
// test on firefox

angular.module('whatToDo.controllers', [])
.controller('GlobalController', ['$rootScope', '$scope', '$firebaseObject', '$firebaseArray', '$timeout', 'DatabaseService', function($rootScope, $scope, $firebaseObject, $firebaseArray, $timeout, DatabaseService) {
    var currentDate = new Date();
    $rootScope.app = {
        year: currentDate.getFullYear(),
        version: '2.0.2'
    };

    $rootScope.firebaseRef;

    $rootScope.questionObject = {
        text: '',
        options: [],
        answer: null,
        date: null,
        isLiked: [ -1 ],
        isLikedAdded: -1
    };
    $rootScope.questionUrl;

    $scope.init = function() {
        // Make the Firebase connection
        $rootScope.firebaseRef = new Firebase("https://what-to-do-app.firebaseio.com/");
        DatabaseService.init($rootScope.firebaseRef);

        angular.element('#loading').hide();
        angular.element('#app-content').show();
    };

    $rootScope.addQuestionToDB = function(question) {
        question.text = question.text || "";

        var promise = DatabaseService.addQuestion(question);

        promise.then(function(ref) {
            $timeout(function() {
                $scope.$apply(function() {
                    $rootScope.questionObject.key = ref.key();
                });
            }, 100);
        });
    };

    $rootScope.saveQuestionToDB = function(question) {
        DatabaseService.saveQuestion(question);
    };

    $rootScope.buttonAsk = function() {
        angular.element('#home-jumbotron').slideUp(function() {
            angular.element('#container-marketing').slideUp(function() {
                var containerApp = angular.element('#container-app');

                angular.element('html,body').animate({
                    scrollTop: containerApp.offset().top - 160
                }, 500);

                containerApp.find('input:first').focus();
            });
        });
    };

    $rootScope.$watch('questionObject.key', function(newValue, newValue2) {
        $rootScope.questionUrl = "http://valkirilov.github.io/what-to-do/#/q/" + newValue;

        angular.element('#fb-share').attr('data-href', $rootScope.questionUrl);
        angular.element('#twitter-share').attr('url', $rootScope.questionUrl);
        angular.element('#goole-share').attr('data-href', $rootScope.questionUrl);
    });


    $scope.init();
}])
.controller('AppController', ['$rootScope', '$scope', '$timeout', '$interval', '$stateParams', 'DatabaseService', function($rootScope, $scope, $timeout, $interval, $stateParams, DatabaseService) {

    $scope.data = [];
    $scope.items = [];
    $scope.askButton = false;
    $scope.askResult = false;
    $scope.divResult = angular.element('#divResult'); // This is the circle with the numer
    $scope.divAnswer = angular.element('#divAnswer'); // This is the box with the info
    $scope.rotateInterval = null;
        
    $scope.canvas = null;
    $scope.context = null;
    $scope.chart = null;
    $scope.canvasSize = null; // Because of the problesm on the iPads
    
    // Colors from http://flatuicolors.com/
    var colorPalletes = [
        ['#1abc9c', '#f1c40f', '#2ecc71', '#e67e22', '#3498db', '#e74c3c', '#9b59b6', '#bdc3c7', '#34495e'], // http://flatuicolors.com/
        ['#897FBA', '#2CC990', '#EEE657', '#00B5B5', '#FCB941', '#8870FF', '#FC6042', '#7E3661', '#E01931', '#2C82C9', '#BB3658', '#7BB0A6', '#D98B3A', '#42729B'], // http://flatcolors.net/
        ['#ED5565', '#FC6E51', '#FFCE54', '#A0D468', '#4FC1E9', '#5D9CEC', '#AC92EC', '#EC87C0', '#656D78', '#DA4453', '#E9573F', '#F6BB42', '#8CC152', '#4A89DC', '#967ADC', '#D770AD'], // http://tintui.com/flattastic.html
        ['#001F3F', '#0074D9', '#7FDBFF', '#39CCCC', '#3D9970', '#2ECC40', '#01FF70', '#FFDC00', '#FF851B', '#FF4136', '#85144B', '#F012BE', '#B10DC9'], // http://tintui.com/clrs.html

        //['#39D5FF', '#29C5FF', '#19B5FE', '#22A7F0', '#1297E0', '#0287D0', '#0077C0', '#0067B0', '#0057A0', '#004790', '#003780', '#102770'], // http://www.flatcolorsui.com/
        //['#8EFFC1', '#5EFCA1', '#4EEC91', '#3EDC81', '#2ECC71', '#1EBC61', '#1EBC61', '#009C41', '#008C31', '#007C21', '#006C11', '#005C01'], // http://www.flatcolorsui.com/
        //['#FDE3A7', '#FFCF4B', '#F9BF3B', '#F9B32F', '#F5AB35', '#F39C12', '#F1892D', '#E67E22', '#D87400', '#C86400', '#B85400', '#A84410'], // http://www.flatcolorsui.com/
    ];
    $scope.colors = [];
    $scope.nextColor = 0;
    
    $scope.musicRotate = null;
    $scope.musicFinish = null;
    $scope.soundRotate = "./sounds/start.wav";
    $scope.soundFinish = "./sounds/end.wav";
    $scope.loadingQuestion = false;
    
    $scope.init = function(inputCanvas) {           
        $scope.canvas = angular.element(inputCanvas);
        $scope.context = $scope.canvas.get(0).getContext("2d");
        $scope.canvasSize =  { width: $scope.canvas.width(), height: $scope.canvas.height() };
        
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

        $scope.getCollorPalette();

        var clipboard = new Clipboard('#btn-copy-clipboard');
    };

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) { 
        // Check on which route we are
        if (toState.name === 'question') {
            $scope.loadingQuestion = true;    
            DatabaseService.loadQuestion(toParams.questionId, $scope.loadQuestion);
        }
        else {
            $scope.newQuestion();
        }
    });
    
    $scope.getCollorPalette = function() {
        var pallete = $scope.getRandom(colorPalletes.length);
        $scope.colors = $scope.shuffleArray(colorPalletes[pallete]);
    };

    $scope.getRandom = function(max) {
        return Math.floor(Math.random() * max);
    };

    $scope.shuffleArray = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };
    
    $scope.contains = function(array, item) {
        for (var i in array)
            if (array[i] === item)
                return true;
        return false;
    };
    
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
        for (var i in $scope.data) {
            $scope.removeChoice($scope.data[i]);
        }
        $scope.data = [];
        $scope.index = [];
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
    };

    $scope.goToChoice = function() {
        angular.element('#form-input-choice').focus();
    };
    
    $scope.prepareChoices = function() {
        $scope.items = [];
        
        $scope.nextColor = 0;
        var size = 100 / $scope.data.length;
        for (var item in $scope.data) {
            var newItem = {};
            if ($scope.data[item].color) {
                newItem.color = $scope.data[item].color;
            }
            else {
                $scope.nextColor = ( ++$scope.nextColor == $scope.colors.length) ? 0 : $scope.nextColor;
                newItem.color = $scope.colors[$scope.nextColor];
            }
            
            
            newItem.value = size;
            newItem.name = $scope.data[item].name;
            newItem.id = $scope.data[item].id;
            
            $scope.items.push(newItem);
        }
    
        // Reset the canvas
        $scope.canvas.addClass('disable-animation');
        $scope.setRotation('rotate(0deg)');

        $scope.resetDivResult();

        $scope.drawChart({animateRotate : false, animateScale : true});
    };
    
    $scope.drawChart = function(options) {
        //$scope.canvas.attr('width', $scope.canvasSize.width);
        //$scope.canvas.attr('height', $scope.canvasSize.height);

        options.showTooltips = false;
        //options.responsive = false;
        $scope.chart = new Chart($scope.context).Doughnut($scope.items, options);
    };
    
    $scope.changeAnswerDivVisibility = function(status) {
        if (status === 1) {
            $scope.divAnswer.slideDown();
            //$scope.divAnswer.css('opacity', '1');
            //$scope.divAnswer.css('display', 'block');
        }
        else {
            //$scope.divAnswer.css('opacity', '0');
            //$scope.divAnswer.css('display', 'none');
            $scope.divAnswer.slideUp();
        }
    };
    
    $scope.randomize = function() {
        
        if ($scope.data.length === 0)
            return;
                
        // Draw the chart
        $scope.drawChart({animateRotate : false, animateScale : false});
        $scope.changeAnswerDivVisibility();
        $scope.showResultCircle('?', '#333333');
        
        var rotationRandom = $scope.getRandom($scope.items.length);
        rotationRandom = rotationRandom < 5 ? 10: rotationRandom;
        var rotationTimes = 360 * rotationRandom; // We want cool rotations
        var step = rotationTimes;
        
        var rotation = 'rotate(' + step + 'deg)';

        // Apply the new rotation
        $scope.canvas.removeClass('disable-animation');
        $scope.setRotation(rotation);

        $scope.askButton = false;
        $scope.askResult = true;
        
        // Play the music and load the next sound
        $scope.musicRotate.play();
        
        var colorIndex = 0;
        $scope.rotateInterval = $interval(function() {
            colorIndex = (colorIndex >= $scope.items.length) ? 0 : colorIndex;
            
            var resultStyle = $scope.items[colorIndex].color;
            $scope.divResult.css('background-color', resultStyle);
            colorIndex++;
        }, 500);
        
        $timeout(function() {
            $scope.musicFinish.play();
            $interval.cancel($scope.rotateInterval);
            
            // Choose the winner and display it
            var resultIndex = $scope.getRandom($scope.data.length);
            var resultStyle = $scope.items[resultIndex].color;
            var resultId = $scope.items[resultIndex].id;
            $scope.showResultCircle(resultId, resultStyle);

            $scope.divResult.addClass('animation-once');
            $scope.divResult.addClass('bounceIn');
            
            var resultBadge = angular.element('#resultBadge');
            var resultName = angular.element('#resultName');
            
            resultBadge.css('background-color', resultStyle);
            resultBadge.text($scope.items[resultIndex].id);
            resultName.text($scope.items[resultIndex].name);
            
            $timeout(function() {
                $scope.changeAnswerDivVisibility(1);
            }, 1000);

            // Add the result to the DB
            var currentDate = new Date();
            $rootScope.questionObject = {
                text: $scope.question,
                options: $scope.items,
                answer: {
                    badge: resultBadge.text(),
                    name: resultName.text(),
                    color: resultStyle
                },
                date: currentDate.toString(),
                isLiked: [ -1 ],
                isLikedAdded: -1
            };
            $rootScope.addQuestionToDB($rootScope.questionObject);
        }, 5000);
    };

    $scope.newQuestion = function() {
        $scope.data = [];
        $scope.items = [];
        $scope.askButton = false;
        $scope.askResult = false;
        $scope.question = '';

        $rootScope.questionObject = {
            text: '',
            options: [],
            answer: null,
            date: null,
            isLiked: [ -1 ],
            isLikedAdded: -1
        };

        $scope.getCollorPalette();
        $scope.resetDivResult();

        $scope.changeAnswerDivVisibility(0);
        $scope.drawChart({});
        $scope.showResultCircle('?', '#333333');

        $rootScope.buttonAsk();
    };

    $scope.resetDivResult = function() {
        $scope.divResult.removeClass('animation-once');
        $scope.divResult.removeClass('bounceIn');

        //$scope.divResult.addClass('animation-infinite');
        //$scope.divResult.addClass('pulse');
    };

    $scope.voteQuestion = function(vote) {
        $rootScope.questionObject.isLiked.push(vote);
        $rootScope.saveQuestionToDB($rootScope.questionObject);

        $timeout(function() {
            $rootScope.$apply(function() {
                $rootScope.questionObject.isLikedAdded = vote;
            });
        }, 100);
    };

    $scope.setRotation = function(rotation) {
        $scope.canvas.get(0).style.MozTransform = rotation;
        $scope.canvas.get(0).style.webkitTransform = rotation;
        $scope.canvas.get(0).style.transform = rotation;
    };

    $scope.showResultCircle = function(result, color) {
        $scope.divResult.text(result);
        $scope.divResult.css('background-color', color);
    };

    $scope.loadQuestion = function(question) {

        angular.element('#loading-question').slideUp();

        $timeout(function() {
            $scope.$apply(function() {
                $rootScope.questionObject = question;
                $scope.loadingQuestion = false;
                $scope.question = question.text;
                $scope.data = question.options;

                $scope.prepareChoices();
                $scope.drawChart({animateRotate : false, animateScale : true});
                
                $scope.divResult.addClass('animation-once');
                $scope.divResult.addClass('bounceIn');
            
                var resultBadge = angular.element('#resultBadge');
                var resultName = angular.element('#resultName');
            
                resultBadge.css('background-color', question.answer.color);
                resultBadge.text(question.answer.badge);
                resultName.text(question.answer.name);
            
                $scope.changeAnswerDivVisibility(1);
                $scope.showResultCircle(question.answer.badge, question.answer.color);
                $scope.askResult = true;
            });
            $rootScope.$apply(function() {
                $rootScope.questionObject.key = question.$id;
            });
        }, 100);
    };
    
    $scope.init('#canvas');
}]);
