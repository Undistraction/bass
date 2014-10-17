module.exports = function(grunt) {

  // Load all available grunt tasks
  require('load-grunt-tasks')(grunt);
  // Bootcamp doesn't use a `grunt-` prefix so load it manually
  grunt.loadNpmTasks('bootcamp');

  // Configure tasks
  grunt.initConfig({

    dir : {
      src : 'sass',
      dist : 'dist'
    },

    pkg: grunt.file.readJSON('package.json'),
    projectName: '<%= pkg.name.toLowerCase() %>',

    // Concat
    concat: {
      options: {
        separator: '\n\n',
        banner: '/*! <%= projectName %> v<%= pkg.version %> – <%= grunt.template.today("dd.mm.yyyy") %> */\n\n',
      },
      dist: {
        src: [
          '<%= dir.src %>/bass/decorations/*.scss',
          '<%= dir.src %>/bass/functions/*.scss',
          '<%= dir.src %>/bass/config/*.scss',
          '<%= dir.src %>/bass/utils/*.scss',
          '<%= dir.src %>/bass/modules/reset/*.scss',
          '<%= dir.src %>/bass/modules/generic/*.scss',
          '<%= dir.src %>/bass/modules/objects/*.scss'
        ],
        dest: '<%= dir.dist %>/_bass.scss',
      },
    },

    // Sass
    sass: {
      options: {
        style: 'expanded',
        compass: false,
        bundleExec: true,
        loadPath: [
          './node_modules/bootcamp/dist',
          './bower_components/box/sass',
          './bower_components/position/sass',
          './bower_components/rhythm/sass',
          './bower_components/sassy-maps/sass',
          './sass'
        ]
      },
      test: {
        files: {
          './tmp/results.css': './test/test.scss'
        }
      },
      styleguide: {
        options: {
          loadPath: [
            './bower_components/normalize-scss',
            './bower_components/compass-breakpoint/stylesheets',
            './bower_components/modular-scale/stylesheets',
            './bower_components/box/sass',
            './bower_components/position/sass',
            './bower_components/rhythm/sass',
            './bower_components/sassy-maps/sass',
            './sass'
          ]
        },
        files: {
          './examples/styleguide/assets/css/app.css': './examples/styleguide/src/sass/app.scss'
        }
      }
    },

    // Tests
    bootcamp: {
      test: {
        files: {
          src: ['./tmp/results.css']
        }
      }
    },

    // Watch
    watch: {
      test: {
        files: [
                './test/**/*.scss',
                './<%= dir.src %>/**/*.scss'
                ],
        tasks: ['test']
      }
    },

    // Docs
    sassdoc: {
      'default': {
        'src': './<%= dir.src %>',
        'dest': './docs',
        'options': {
          'config': './.sassdocrc'
        }
      }
    },

    open : {
      docs : {
        path: './docs/index.html',
        app: 'Google Chrome'
      },
      styleguide : {
        path: 'http://localhost:8999',
        app: 'Google Chrome'
      }
    },

    // Connect
    connect: {
      styleguide: {
        options: {
          port: 8999,
          keepalive: true,
          open: 'http://localhost:8999/index.html',
          hostname: 'localhost',
          base: './examples/styleguide'
        }
      }
    },

    // Shell
    shell: {
        options: {
            stderr: false
        },
        // Copy docs folder to gh-branch and push it
        ghpages: {
            command: [
              "git checkout gh-pages",
              "git checkout master ./docs",
              "git add -A",
              "git c -m 'docs: Update Docs to v<%= pkg.version %>'",
              "git push origin gh-pages",
              "git checkout master"
            ].join('&&')
        }
    },

    // Versioning
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'version: Bump to %VERSION%',
        commitFiles: ['package.json', 'bower.json', 'docs/*', 'dist/*'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false
      }
    }
  });

  // Define own tasks
  grunt.registerTask('test', ['sass:test', 'bootcamp']);
  grunt.registerTask('styleguide', ['sass:styleguide', 'connect:styleguide']);
  grunt.registerTask('dev', ['test', 'watch:test']);
  grunt.registerTask('build', ['test', 'sassdoc', 'concat']);
  grunt.registerTask('docs', ['sassdoc', 'open:docs']);
  grunt.registerTask('deploy', ['sassdoc', 'build', 'bump-commit', 'shell:ghpages'])
  grunt.registerTask('patch', ['bump-only:patch', 'deploy']);
  grunt.registerTask('minor', ['bump-only:minor', 'deploy']);
};