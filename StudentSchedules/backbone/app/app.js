define([
    "backbone",
], function (Backbone) {
    return Backbone.View.extend({
        initialize: function (options) {
            this.studentCollection = options.studentCollection;
            this.filteredCollection = options.filteredCollection;

            this.studentListView = options.studentListView;

            this.$el.append(this.studentListView.el);

            this.studentCollection.loadFromJSON();
        },

        clear: function () {
            this.filteredCollection.reset();
        },

        events: {
            "keyup #namesbox": "didChangeNamesbox"
        },

        didChangeNamesbox: function (evt) {
            var val = evt.currentTarget.value;
            this.showByWhere({ names: val });
        },

        showAll: function () {
            this.clear();

            var students = this.studentCollection.getAll();
            this.filteredCollection.add(students);
        },

        showByWhere: function (params) {
            this.clear();

            var names = _.without(params.names.split(' '), "");

            var students = this.studentCollection.filter(function (p) {
                if (names.length > 0) {
                    var isMatch = false;
                    _(names).each(function (name) {
                        if (p.get("name").toLowerCase().indexOf(name.toLowerCase()) >= 0) {
                            isMatch = true;
                        }
                    });
                    return isMatch;
                }
                else {
                    return true;
                }
            });

            if (names.length > 0) {
                _.each(students, function (student) {
                    _.each(student.get("schedule"), function (schedule) {
                        var sharesSchedule = false;

                        var excludedStudentList = _.without(students, student);
                        _.each(excludedStudentList, function (s) {
                            _.each(s.get("schedule"), function (schd) {
                                if (schd.teacherName == schedule.teacherName) {
                                    sharesSchedule = true;
                                }
                            });
                        });

                        schedule.shared = sharesSchedule;
                    });
                });
            } else {
                _.each(students, function (student) {
                    _.each(student.get("schedule"), function (schedule) {
                        schedule.shared = false;
                    });
                });
            }

            this.filteredCollection.add(students);
        }
    });
});