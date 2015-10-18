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
          'app/dist/styles.min.css': [
            'app/bower_components/bootstrap/dist/css/bootstrap.min.css', 
            'app/styles/app.css', 
            'app/styles/jumbotron-narrow.css'
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
          'app/dist/libs.min.js': [
            'app/bower_components/jquery/dist/jquery.min.js', 
            'app/bower_components/bootstrap/dist/js/bootstrap.min.js', 
            'app/bower_components/firebase/firebase.js', 
            'app/bower_components/angular/angular.min.js', 
            'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'app/bower_components/angularfire/dist/angularfire.min.js',
            'app/bower_components/moment/min/moment.min.js',
            'app/bower_components/Chart.js/Chart.min.js',
            'app/bower_components/clipboard/dist/clipboard.min.js',
          ],
          'app/dist/scripts.min.js': [
            'app/scripts/app.js', 
            'app/scripts/controllers.js', 
            'app/scripts/directives.js', 
            'app/scripts/filters.js', 
            'app/scripts/services.js'
          ]
        }
      },
      scripts: {
        files: {
          'app/dist/scripts.min.js': [
            'app/scripts/directives.js', 
            'app/scripts/filters.js', 
            'app/scripts/services.js',
            'app/scripts/controllers.js',
            'app/scripts/app.js', 
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
          src: ['app/index.html']
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
        files: ['app/styles/*.css', 'app/scripts/*.js'],
        tasks: ['cssmin', 'uglify:scripts', 'notify:watch', 'cachebreaker'],
      },
    },

    connect: {
      server: {
        options: {
          port: 3030,
          hostname: '*',
          base: 'app'
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