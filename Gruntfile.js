module.exports = function(grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    source: "src",
    release: "release",
    temp: ".tmp",

    bump: {
      options: {
        files: ["package.json", "bower.json"],
        commit: true,
        commitMessage: "Release v%VERSION%",
        commitFiles: ["-a"],
        createTag: true,
        tagName: "v%VERSION%",
        tagMessage: "Version %VERSION%",
        push: true,
        pushTo: "origin",
        gitDescribeOptions: "--tags --always --abbrev=1 --dirty=-d"
      }
    },

    clean: {
      release: "<%= release %>",
      temp: "<%= temp %>"
    },

    fontfactory: {
      build: {
        src: "<%= source %>/**/*.svg",
        dest: "<%= release %>",
        options: {
          font: "<%= pkg.name %>"
        }
      }
    }

  });

  grunt.registerTask("default", ["build"]);

  grunt.registerTask("build", [
    "clean",
    "fontfactory",
    "clean:temp"
  ]);
};
