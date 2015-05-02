if(Meteor.isClient) {
	Template.newPass.events({
		'click .today': function() {
			$("#inputPassDate")[0].valueAsDate = new Date();
		},

		'click .tomorrow': function() {
			// Apply tomorrow's date to date picker
			var today = moment();
			var tomorrow = today.add('days', 1);
			$("#inputPassDate")[0].valueAsDate = tomorrow.toDate();
		},

		'submit .new-pass': function() {
			var passDateVal = event.target.passDate.valueAsDate;
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

	Template.newPass.rendered = function() {
		// Default to the current date
		$("#inputPassDate")[0].valueAsDate = new Date();
	};
}