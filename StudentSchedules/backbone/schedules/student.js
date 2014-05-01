define([
    'backbone',
    'responsiveDispatch'
], function (Backbone, responsiveDispatch) {
    return Backbone.Model.extend({

        initialize: function () {
            //this.listenTo(responsiveDispatch, 'didClickSchedule', this.didClickSchedule);
            //responsiveDispatch.on("didClickSchedule", this.didClickSchedule);
        },

        didClickSchedule: function () {
            console.log("didClickSchedule");
        }
    });
});