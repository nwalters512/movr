Template.newTeacher.events({
	'submit .new-teacher': function(event) {
		var firstNameVal = event.target.firstName.value;
		var lastNameVal = event.target.lastName.value;
		var emailVal = event.target.email.value;
		var seminarLocationVal = event.target.seminarLocation.value;
		var passwordVal = event.target.password.value;

		var userData = {
			firstName: firstNameVal,
			lastName: lastNameVal,
			email: emailVal,
			seminarLocation: seminarLocationVal,
			password: passwordVal
		};

		Meteor.call('createTeacher', userData, function(error, result) {
			if (!error) {
				Router.go('/app/admin/teachers');
				Session.set("createTeacherHasError", false);
				Session.set("createTeacherError", null);
			} else {
				console.log("Error adding user! " + error);
				Session.set("createTeacherHasError", true);
				Session.set("createTeacherError", error);
			}
		});

		return false;
	},

	'click .cancel': function(event) {
		Router.go('/app/admin/teachers');
	}
});

Template.newTeacher.helpers({
	createTeacherHasError: function() {
		return Session.get("createTeacherHasError");
	},

	createTeacherError: function() {
		return Session.get("createTeacherError").reason;
	}
});

Template.newTeacher.onRendered(function() {
	Session.set("createTeacherHasError", false);
	Session.set("createTeacherError", null);

	$("#input-seminar-location").select2({
		placeholder: "Select a Location"
	});
});