module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        handlebars: {
            compile: {

                options: {
                    namespace: 'Schedules.Templates',
                    amd: true,
                    processName: function (filePath) {
                        var parts = filePath.split('/');
                        var dirName = parts[parts.length - 2];
                        var fileName = parts[parts.length - 1];

                        var templateName = fileName.replace(/\.handlebars/ig, '');

                        return templateName;
                    }
                },

                files: {
                    'schedules/templates.js': [
                        'schedules/*.handlebars'
                    ]
                }
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib-handlebars');

    grunt.registerTask('default', 'handlebars');


};