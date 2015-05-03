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
    // Use ^ and $ to match exactly
    var pattern = new RegExp('^' + route + '$');
    return currentRoute && pattern.test(currentRoute.route.getName()) ? 'active' : '';
});

UI.registerHelper('locationNameForId', function(locationId) {
    var name;
    var location = Locations.findOne({
        _id: locationId
    });
    if (location) {
        name = location.name;
    } else {
        name = "***Location not found***";
    }

    return name;
});

UI.registerHelper('locationAliasesForIdAsString', function(locationId) {
    var location = Locations.findOne({
        _id: locationId
    });
    if (location && location.aliases) {
        var aliases = location.aliases[0];
        for (var i = 1; i < location.aliases.length; i++) {
            aliases = locations.append(", ", location.aliases[i]);
        }
        return aliases;
    } else {
        return "";
    }
});

UI.registerHelper('locationHasAliases', function(locationId) {
    var location = Locations.findOne({
        _id: locationId
    });
    if (location && location.aliases) {
        if (location.aliases.length > 0) {
            return true;
        }
        return false;
    }
    return false;
});

UI.registerHelper('currentUserProfile', function() {
    return Meteor.user().profile;
});

Meteor.startup(function() {
    for (var property in Template) {
        // check if the property is actually a blaze template
        if (Blaze.isTemplate(Template[property])) {
            var template = Template[property];
            // assign the template an onRendered callback to initialize material stuff
            template.onRendered(function() {
                $.material.init();
            });
        }
    }
});
