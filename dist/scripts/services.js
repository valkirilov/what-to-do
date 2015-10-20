'use strict';

/* Services */

angular.module('whatToDo.services', [])
.factory('DatabaseService', ['$rootScope', '$http', '$firebaseObject', '$firebaseArray', '$location', '$timeout', function ($rootScope, $http, $firebaseObject, $firebaseArray, $location, $timeout) {

  var firebaseRefUrl,
      firebaseRef,
      questionsList,
      gameObj;

  var init = function(ref) {
    firebaseRefUrl = ref;
    firebaseRef = firebaseRefUrl.child('questions');
    questionsList = $firebaseArray(firebaseRef);

    questionsList.$loaded(function(data) {
      $rootScope.isQuestionsListLoaded = true;
    });

  };

  var addQuestion = function(question) {
    var promise = questionsList.$add(question);
    return promise;
  };

  var saveQuestion = function(question) {
    var questionDB = questionsList.$getRecord(question.key);
    questionDB.isLiked = question.isLiked;
    questionsList.$save(questionDB);
  };

  /**
   * Load a specific question by its id
   * @param  {[type]} questionId [description]
   * @return {[type]}        [description]
   */
  var loadQuestion = function(questionId, callback) {
    var questionRef = firebaseRefUrl.child('questions/'+questionId+'/');
    var question = $firebaseObject(questionRef);
    
    question.$loaded(function(data) { 
      callback(data);
    });
  };

  return {
    init: init,
    addQuestion: addQuestion,
    saveQuestion: saveQuestion,
    loadQuestion: loadQuestion,
  };
}]);