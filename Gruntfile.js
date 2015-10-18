module.exports = function(grunt) {

  grunt.initConfig({
  pkg : grunt.file.readJSON('package.json'),

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/styles.min.css': [
            'bower_components/bootstrap/dist/css/bootstrap.min.css', 
            'bower_components/font-awesome/css/font-awesome.min.css', 
            'styles/app.css', 
            'styles/jumbotron-narrow.css'
          ],
        }
      }
    },

    uglify: {
      options: {
        beautify: true,
      },
      all: {
        files: {
          'dist/libs.min.js': [
            'bower_components/jquery/dist/jquery.min.js', 
            'bower_components/bootstrap/dist/js/bootstrap.min.js', 
            'bower_components/firebase/firebase.js', 
            'bower_components/angular/angular.min.js', 
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/angularfire/dist/angularfire.min.js',
            'bower_components/Chart.js/Chart.min.js',
            'bower_components/clipboard/dist/clipboard.min.js',
          ],
          'dist/scripts.min.js': [
            'scripts/app.js', 
            'scripts/controllers.js', 
            'scripts/directives.js', 
            'scripts/filters.js', 
            'scripts/services.js'
          ]
        }
      },
      scripts: {
        files: {
          'dist/scripts.min.js': [
            'scripts/directives.js', 
            'scripts/filters.js', 
            'scripts/services.js',
            'scripts/controllers.js',
            'scripts/app.js', 
          ]
        }
      }
    },

    // Append a timestamp to JS and CSS files which are located in 'index.html'
    cachebreaker: {
      dev: {
        options: {
          match: [
            'dist/styles.min.css',
            'dist/libs.min.js',
            'dist/scripts.min.js',
          ],
        },
        files: {
          src: ['index.html']
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      less: {
        options: {
          livereload: false
        },
        files: ['styles/*.css', 'scripts/*.js'],
        tasks: ['cssmin', 'uglify:scripts', 'notify:watch', 'cachebreaker'],
      },
    },

    connect: {
      server: {
        options: {
          port: 3030,
          hostname: '*',
        }
      }
    },

    notify_hooks: {
      options: {
        enabled: true,
        max_jshint_notifications: 5, // maximum number of notifications from jshint output
        title: "Le Bus", // defaults to the name in package.json, or will use project directory's name
        success: false, // whether successful grunt executions should be notified automatically
        duration: 1 // the duration of notification in seconds, for `notify-send only
      }
    },

    notify: {
      watch: {
        options: {
          title: 'Watch Detected', 
          message: 'LESS and minification finished.',
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-cache-breaker');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.task.run('notify_hooks');
  
  grunt.registerTask('default', ['cssmin', 'uglify:scripts', 'cachebreaker', 'connect', 'watch']);
  grunt.registerTask('build', ['cssmin', 'uglify:all', 'cachebreaker']);
};