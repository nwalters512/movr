Meteor.methods({
	createLocation: function(locationData) {
		var ownerVal;
		if (!Roles.userIsInRole(this.userId, ['admin'])) {
			throw new Meteor.Error(403, "Passes can only be owned by students; you are not a student or did not provide a valid student ID.");
		}

		console.log("Creating pass with owner: " + ownerVal);

		Locations.insert({
			name: locationData.name,
			aliases: locationData.aliases
		});
	}
});