
requirejs.config({
    baseUrl: 'backbone',

    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        handlebars: 'lib/handlebars',

        responsiveDispatch: 'lib/responsiveDispatch'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    }

});

require([
    'jquery',
    'underscore',
    'backbone',
    'responsiveDispatch',
    'app/app',
	'schedules/studentCollection',
    'schedules/listView'
], function ($, _, Backbone, responsiveDispatch, ClassSchedule, StudentCollection, StudentListView) {

    var ranges = [
        { name: "large", min: 979, max: Infinity },
        { name: "medium", min: 767, max: 979 },
        { name: "small", min: 0, max: 767 }
    ];

    responsiveDispatch.initRanges(ranges);

    responsiveDispatch.on('didEnter:small', function () {

    });

    responsiveDispatch.on('didEnter:medium', function () {

    });

    responsiveDispatch.on('didEnter:large', function () {

    });

	var studentCollection = new StudentCollection();
    var filteredCollection = new StudentCollection();

    var studentListView = new StudentListView({
        model: filteredCollection
    });

    window.app = new ClassSchedule({
        el: $('body'),
        studentCollection: studentCollection,
        filteredCollection: filteredCollection,
        studentListView: studentListView
    });
});

