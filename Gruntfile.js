module.exports = function(grunt) {

  const sass = require('node-sass');

  grunt.initConfig({

    jshint: {
      files: ['Gruntfile.js', 'src/sripts/app.js', 'test/**/*.js'],
      options: {
        esversion: 6,
        globals: {
          jQuery: true
        }
      }
    },

    copy: {
      pages: {
        expand: true,
        cwd: 'src/pages',
        src: '**/*.html',
        dest: 'public/'
      },

      images: {
        files: [
          {
            expand: true,
            cwd: 'src/img',
            src: ['**/*.{png,svg,jpg}'],
            dest: 'public/img'
          }
        ]
      },

      mockApi: {
        expand: true,
        cwd: 'api/products',
        src: '**/*.json',
        dest: 'public/'
      }
    },

    sass: {
        options: {
          implementation: sass,
          sourceMap: true
        },
        dist: {
          files: {
              'public/styles/app.css': 'src/styles/app.scss'
          }
        }
    },   
    
    uglify: {
      scripts: {
        options: {
          sourceMap: true
        },
        files: {
          'public/scripts/app.js': 'src/scripts/app.js',            
        }                                       
      },
    },
    
    babel: {
      options: {
        sourceMap: false,
        plugins: ['transform-react-jsx'],
        presets: ['es2016', 'react']
      },
      jsx: {
        files: [{
          expand: true,
          cwd: 'src/scripts', 
          src: ['**/*.js'],
          dest: 'public/scripts', 
          ext: '.js'
        }]
      }
    },    

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['dev']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-babel');


  grunt.registerTask('build', ['babel', 'jshint', 'sass', 'copy', 'uglify']);
  grunt.registerTask('dev', ['build', 'watch']);
  grunt.registerTask('default', ['build']);  
};