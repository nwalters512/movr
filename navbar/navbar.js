if(Meteor.isClient) {

	Template.navbar.events({
		'click .logout': function() {
			Meteor.logout(function() {
				Router.go('/');
			});
		}
	});
}