Meteor.methods({
	createStudent: function(userData) {
		var id;

		// Throw an error if someone attemps to create a student with an ID
		// that already belongs to another student
		if(Meteor.users.find({ roles: {$in: ['student']}, "profile.studentId": userData.studentId}).count() > 0) {
			throw new Meteor.Error(409, "A user already exists with the given ID. Student IDs must be unique.");
		}

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
	}
});