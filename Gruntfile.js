module.exports = function(grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    source: "src",
    release: "release",
    temp: "tmp",

    bump: {
      options: {
        files: ["package.json"],
        commit: true,
        commitMessage: "Release v%VERSION%",
        commitFiles: ["-a"], // "-a" for all files
        createTag: true,
        tagName: "v%VERSION%",
        tagMessage: "Version %VERSION%",
        push: true,
        pushTo: "origin",
        gitDescribeOptions: "--tags --always --abbrev=1 --dirty=-d" // options to use with "$ git describe"
      }
    },

    clean: {
      release: "<%= release %>",
      temp: "<%= temp %>"
    },

    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }]
      },
      build: {
        files: [{
          expand: true,
          cwd: "<%= source %>",
          src: ["**/*.svg"],
          dest: "<%= temp %>"
        }]
      }
    },

    webfont: {
      build: {
        src: ["<%= temp %>/**/*.svg", "<%= source %>/**/*.eps"],
        dest: "<%= release %>/fonts",
        destCss: "<%= release %>",
        options: {
          font: "<%= pkg.name %>",
          syntax: "suit",
          template: "./templates/suit.css",
          hashes: false
        }
      }
    }

  });

  grunt.registerTask("default", ["build"]);

  grunt.registerTask("build", [
    "clean:release",
    "svgmin:build",
    "webfont:build",
    "clean:temp"
  ]);
};
