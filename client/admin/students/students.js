Template.students.events({
	'click .new-student': function() {
		Router.go('/app/admin/students/new');
	}
});

Template.students.helpers({
	students: function() {
		return Meteor.users.find({ roles: { $in: ['student']}});
	},

	settings: function() {
		return {
			rowsPerPage: 30,
			showFilter: true,
			fields: [{
				key: 'profile.lastName',
				label: "Last Name"
			}, {
				key: 'profile.firstName',
				label: "First Name"
			}, {
				key: 'profile.studentId',
				label: "Student ID"
			}, {
				key: 'emails',
				label: 'Emails',
				fn: function(value, object) {
					// Create a comma-separated list of all emails
					var emailString = value[0].address;
					for(var i = 1; i < value.length; i++) {
						emailString = emailString.concat(',', value[i].address);
					}
					return emailString;
				}
			}]
		};
	}
});