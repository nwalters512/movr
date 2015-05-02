Meteor.startup(function() {
	console.log("Startup function called");

	console.log("User count: " + Meteor.users.find().count());

	if(Meteor.users.find().count() === 0) {
		var id = Accounts.createUser({
			email: 'nwalters512@gmail.com',
			password: 'adminPassword',
			profile: {
				first_name: "Nathan",
				last_name: "Walters",
				student_id: 715425
			}
		});

		console.log("Default user created!");

		Roles.addUsersToRoles(id, 'admin');
	}
});