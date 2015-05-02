Meteor.subscribe("students");
Meteor.subscribe("passes");

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

UI.registerHelper('activeIfRouteMatches', function(route) {
	var currentRoute = Router.current();
	console.log("Current route: " + currentRoute.route.getName());
	// Use ^ and $ to match exactly
	var pattern = new RegExp('^' + route + '$');
	return currentRoute && pattern.test(currentRoute.route.getName()) ? 'active' : '';
});


Template.appLayout.rendered = function() {
	$.material.init();
};