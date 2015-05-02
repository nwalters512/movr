Template.newLocation.rendered = function() {
	$("#input-aliases").select2({
		tags: true,
		tokenSeparators: [','],
		placeholder: "Enter a comma-separated list of aliases"
	});
};

Template.newLocation.events({
		'submit .new-location': function(event) {
		var nameVal = event.target.name.value;
		var selectedArray = $("#input-aliases").select2('data');
		var aliasesVal = [];
		for (var i = 0; i < selectedArray.length; i++) {
			aliasesVal[i] = selectedArray[i].text;
		}

		var locationData = {
			name: nameVal,
			aliases: aliasesVal
		};

		Meteor.call('createLocation', locationData, function(error, result) {
			if (!error) {
				Router.go('/app/admin/locations');
			} else {
				console.log("Error adding user! " + error);
			}
		});

		return false;
	}
});