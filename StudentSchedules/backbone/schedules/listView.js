define([
    'backbone',
    'schedules/templates',
    'responsiveDispatch'
], function (Backbone, Templates, responsiveDispatch) {
    return Backbone.View.extend({
        template: Templates.listView,

        initialize: function (options) {
            this.model.on('add change remove reset', this.render, this);
            this.render();
        },

        events: {
            "click .schedule": "clickedSchedule"
        },

        clickedSchedule: function(e) {
            $(e.target).css({ background: "#ccc" });
            responsiveDispatch.trigger("didClickSchedule");
        },

        viewModel: function () {
            var headers = [];

            if (this.model.length !== 0)
                headers = this.model.first().keys();

            var rows = this.model.toJSON();

            return {
                headers: headers,
                rows: rows
            };
        },

        render: function () {
            this.$el.html(this.template(this.viewModel()));
        }
    });
});