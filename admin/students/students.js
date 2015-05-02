if(Meteor.isClient) {
	Template.students.events({
		'click .new-student': function() {
			Router.go('/app/admin/students/new');
		}
	});

	Template.newStudent.events({
		'submit .new-student': function(event) {
			var firstNameVal = event.target.firstName.value;
			var lastNameVal = event.target.lastName.value;
			var emailVal = event.target.email.value;
			var studentIdVal = event.target.studentId.value;
			var passwordVal = event.target.password.value;

			var userData = {
				firstName: firstNameVal,
				lastName: lastNameVal,
				email: emailVal,
				studentId: studentIdVal,
				password: passwordVal
			};

			Meteor.call('createStudent', userData, function(error, result) {
				if (!error) {
					Router.go('/app/admin/students');
				} else {
					console.log("Error adding user! " + error);
				}
			});

			return false;
		}
	})
}