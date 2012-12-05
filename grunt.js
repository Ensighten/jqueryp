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
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    template: {
      vanilla: {
        src: 'lib/templates/vanilla.mustache',
        dest: 'stage/jqueryp.js',
        variables: {
          jqueryp: read('lib/jqueryp.js'),
          require_chainer: read('lib/require_chainer.js')
        }
      },
      require: {
        src: 'lib/templates/require.mustache',
        dest: 'stage/jqueryp.require.js',
        variables: {
          jqueryp: read('lib/jqueryp.js'),
          require_chainer: read('lib/require_chainer.js')
        }
      }
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:lib/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    test: {
      files: ['test/**/*.js']
    },
    lint: {
      files: ['grunt.js', 'lib/**/*.js', 'lib/**/*.mustache', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint test'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      globals: {
        exports: true,
        module: false
      }
    },
    uglify: {}
  });

  // Load in grunt-templater
  grunt.loadNpmTasks('grunt-templater');

  // Default task.
  grunt.registerTask('default', 'lint test concat min');

};
