// Publish student data
Meteor.publish("students", function() {
	if(Roles.userIsInRole(this.userId, ['admin'])) {
		return Meteor.users.find({ roles: { $in: ['student']}}, 
			{fields: {'emails': 1, 'profile': 1, 'roles': 1}});
	}
	
	this.stop();
	return;
});

Meteor.publish("passes", function() {
	return Passes.find({owner: this.userId});
})

Meteor.methods({
	createStudent: function(userData) {
		var id;

		id = Accounts.createUser({
			email: userData.email,
			password: userData.password,
			profile: {
				firstName: userData.firstName,
				lastName: userData.lastName,
				studentId: userData.studentId
			}

		});

		Roles.addUsersToRoles(id, ['student']);
	},

	createPass: function(passData) {
		var loggedInUser = Meteor.user();
		var passDateVal = passData.passDate;
		var destinationVal = passData.destination;

		Passes.insert({
			passDate: passDateVal,
			createdDate: new Date(),
			destination: destinationVal,
			owner: loggedInUser._id
		});
	},

	deletePass: function(passId) {
		var pass = Passes.findOne({_id: passId});
		if (Roles.userIsInRole(this.userId, ['delete-pass', 'admin']) || pass.owner === this.userId) {
			Passes.remove(passId);
		} else {
			throw new Meteor.error(403, "You do not have permission to delete this pass.");
		}
		
	}
});