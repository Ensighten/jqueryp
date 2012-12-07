/*global module:true */
module.exports = function(grunt) {
  // TODO: Create/pull request read+variables functionality into grunt-templater
  var read = grunt.file.read;

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> Ensighten;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    template: {
      vanilla: {
        src: 'src/templates/vanilla.mustache',
        dest: 'stage/jqueryp.js',
        variables: {
          jqueryp: read('src/jqueryp.js'),
          require_chainer: read('src/require_chainer.js')
        }
      },
      require: {
        src: 'src/templates/require.mustache',
        dest: 'stage/jqueryp.require.js',
        variables: {
          jqueryp: read('src/jqueryp.js'),
          require_chainer: read('src/require_chainer.js')
        }
      },
      chainer: {
        src: 'src/templates/chainer.mustache',
        dest: 'stage/jqueryp.chainer.js',
        variables: {
          jqueryp: read('src/jqueryp.js'),
          require_chainer: read('src/require_chainer.js')
        }
      }

    },
    concat: {
      distVanilla: {
        src: ['<banner:meta.banner>', '<file_strip_banner:stage/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      distRequire: {
        src: ['<banner:meta.banner>', '<file_strip_banner:stage/<%= pkg.name %>.require.js>'],
        dest: 'dist/<%= pkg.name %>.require.js'
      },
      distChainer: {
        src: ['<banner:meta.banner>', '<file_strip_banner:stage/<%= pkg.name %>.chainer.js>'],
        dest: 'dist/<%= pkg.name %>.chainer.js'
      }
    },
    min: {
      distVanilla: {
        src: ['<banner:meta.banner>', '<config:concat.distVanilla.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      },
      distRequire: {
        src: ['<banner:meta.banner>', '<config:concat.distRequire.dest>'],
        dest: 'dist/<%= pkg.name %>.require.min.js'
      },
      distChainer: {
        src: ['<banner:meta.banner>', '<config:concat.distChainer.dest>'],
        dest: 'dist/<%= pkg.name %>.chainer.min.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: ['<config:lint.files>', '<config:qunit.files>'],
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        // newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,

        browser: true
      },
      globals: {
        '$': true,
        'jQuery': true,
        'require': true,
        'define': true
      }
    },
    uglify: {}
  });

  // Load in grunt-templater
  grunt.loadNpmTasks('grunt-templater');

  // Alias test as qunit
  grunt.registerTask('test', 'qunit');

  // Default task.
  grunt.registerTask('default', 'lint template concat min test');

};
