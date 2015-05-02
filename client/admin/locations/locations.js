Template.locations.helpers({
	locations: function() {
		return Locations.find({});
	},

	settings: function() {
		return {
			rowsPerPage: 30,
			showFilter: true,
			fields: [{
				key: 'name',
				label: "Name"
			}, {
				key: 'aliases',
				label: "Aliases",
				fn: function(value, object) {
					if (!value) {
						console.log("Aliases not found!");
						console.log("Object: " + object.toString());
						return "";
					}
					var aliasesString = value[0];
					for(var i = 1; i < value.length; i++) {
						aliasesString = aliasesString.concat(',', value[i]);
					}
					return aliasesString;
				}
			}]
		};
	}
});

Template.locations.events({
	'click .new-location': function() {
		Router.go('/app/admin/locations/new');
	},

	'click .cancel': function() {
		Router.go('/app/admin/locations');
	}
});