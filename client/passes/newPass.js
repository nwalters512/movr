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

Template.newPass.onRendered(function() {
    // Default to the current date
    $("#inputPassDate").datepicker({
        startDate: new Date()
    });
    $("#inputPassDate").datepicker('update', new Date());

    $("#input-destination").select2({
    	placeholder: "Select your destination"
    });
});
