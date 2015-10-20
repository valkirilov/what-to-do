'use strict';

/* Filters */

angular.module('whatToDo.filters', [])
.filter('likes', [function() {
  return function(votes) {
    var count = 0;
    votes.forEach(function(vote) {
      if (vote === 1) {
        count++;
      }
    });
    return count;
  };
}])
.filter('dislikes', [function() {
  return function(votes) {
    var count = 0;
    votes.forEach(function(vote) {
      if (vote === 0) {
        count++;
      }
    });
    return count;
  };
}]);