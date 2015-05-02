if(Meteor.isClient) {
	Template.login.events({
		'submit .login': function(event) {
			var user = event.target.email.value;
			var password = event.target.password.value;
			// Log in the user based on the provided details
			Meteor.loginWithPassword(user, password, function(error) {
				if(error) {
					console.log("Error logging in user: " + error);
					Session.set("loginError", true);
				} else {
					Router.go('/app');
				}
			});
			return false;
		}
	});

	Template.login.helpers({
		loginError: function() {
			return Session.get("loginError");
		}
	});

	// Reset loginError flag if the page is refreshed or reloaded
	Template.login.rendered = function() {
		Session.set("loginError", false);
	};
}