var app = require('./backend/app.js');

module.exports = function(grunt) {
    // plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        connect: {
            server: {
              options: {
                port: 9000,
                keepalive: true,
                middleware: function(connect, options, middlewares) {
                    app.createRoutes(middlewares);
                    return middlewares;
                }
            } ,
        },
    },
        concat: {
            dist: {
                src: [
                    'scripts/*.js'
                ],
                dest: 'main.js',
            }
        }

    });


    // grunt tasks 
    grunt.registerTask('default', ['concat']);
    grunt.registerTask('server', ['concat', 'connect']);

};