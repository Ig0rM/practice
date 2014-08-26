var routes = require('./backend/routes.js');

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
                    routes.createRoutes(middlewares);
                    return middlewares;
                }
            },
        },
    },
        concat: {
            dist: {
                src: [
                    'frontend/*.js'
                ],
                dest: 'main.js',
            }
        }
    });

    // grunt tasks 
    grunt.registerTask('default', ['concat']);
    grunt.registerTask('server', ['concat', 'connect']);

};