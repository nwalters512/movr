if (Meteor.isClient) {
	// Used for formatting dates in handlebars
	// Usage: {{formatDate <string> "<formatterName>"}}
	var DateFormats = {
		short: "MMM DD YYYY"
	};

	UI.registerHelper("formatDate", function(datetime, format) {
		if (moment) {
			format = DateFormats[format] || format;
			return moment(datetime).format(format);
		} else {
			return datetime;
		}
	});

	UI.registerHelper('activeIfRouteIs', function(route) {
		var currentRoute = Router.current();
		console.log("Current route: " + currentRoute.route.getName());
		var pattern = new RegExp(route);
		return currentRoute && pattern.test(currentRoute.route.getName()) ? 'active' : '';
	});

	Template.pendingPassList.helpers({
		'passes': function() {
			return Passes.find().fetch();
		}
	});

	Template.pendingPassList.rendered  = function() {
		$.material.init();
		console.log("pendingpass Init!");
	};

	Template.allPassList.helpers({
		'passes': function() {
			return Passes.find().fetch();
		}
	});

	Template.allPassList.rendered = function() {
		$.material.init();
		console.log("allpass Init!");
	};

	Template.appLayout.rendered = function() {
		$.material.init();
		console.log("Init!");
	};

	Template.allPassList.events({
		'click .delete-pass': function() {
			Meteor.call('deletePass', this._id);
		}
	});
}

Passes = new Mongo.Collection('passes');