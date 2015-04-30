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

  Template.body.helpers({
	passes: [
  		{ name: "Nathan Walters", requested_date: new Date(), pass_date: new Date()}
  	]
  });
}
  /*Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });*/
