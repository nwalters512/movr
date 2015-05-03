Template.teachers.events({
	'click .new-teacher': function() {
		Router.go('/app/admin/teachers/new');
	}
});

Template.teachers.helpers({
	teachers: function() {
		return Meteor.users.find({ roles: { $in: ['teacher']}});
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
				key: 'profile.seminarLocation',
				label: "Seminar Location", 
				fn: function(value, object) {
					// Find the location from the given ID
					if(!value) {
						return "None set";
					}

					var location = Locations.findOne({_id: value});
					if(!location) {
						return "Location not found";
					} else {
						return location.name;
					}
				}
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