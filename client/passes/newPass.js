Template.newPass.events({
    'click .today': function() {
        // Apply today's date to the picker
        $("#inputPassDate").datepicker('update', new Date());
    },

    'click .tomorrow': function() {
        // Apply tomorrow's date to date picker
        var today = moment();
        var tomorrow = today.add(1, 'days');
        $("#inputPassDate").datepicker('update', tomorrow.toDate());
    },

    'submit .new-pass': function() {
        var passDateVal = $("#inputPassDate").datepicker('getDate');
        var destinationVal = event.target.destination.value;
        var passData = {
            passDate: passDateVal,
            destination: destinationVal
        };

        Meteor.call('createPass', passData, function(error, result) {
            Router.go('/app/passes/all');
        });

        return false;
    }
});

Template.newPass.helpers({
    generateLocationOptions: function() {
        var locationOptions = [];
        var allLocations = Locations.find({}).fetch();
        // For each location, add its name and all aliases to an array
        _.each(allLocations, function(location) {
            locationOptions.push({
                value: location._id,
                name: location.name
            });
            _.each(location.aliases, function(alias) {
                locationOptions.push({
                    value: location._id,
                    name: alias
                });
            });
        });

        // Now sort the array alphabetically
        return _.sortBy(locationOptions, function(location) {
            return location.name;
        });
    }
});

Template.newPass.rendered = function() {
    // Default to the current date
    $("#inputPassDate").datepicker({
        startDate: new Date()
    });
    $("#inputPassDate").datepicker('update', new Date());

    $("#input-destination").select2();
};
