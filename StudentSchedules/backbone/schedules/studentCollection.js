define([
    'backbone',
    'schedules/student'
], function (Backbone, Student) {
    return Backbone.Collection.extend({
        model: Student,

        loadFromJSON: function () {
            $.ajax({
                url: 'data/student-schedules.json',
                success: _(this.parseFromJSON).bind(this)
            });
        },

        parseFromJSON: function (response) {
            console.log('response received', response);
            this.add(JSON.parse(response));
            app.showAll();
        },

        getAll: function () {
            return this.models;
        },
    });
});