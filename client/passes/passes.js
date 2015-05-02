Template.allPassList.events({
	'click .delete-pass': function() {
		Meteor.call('deletePass', this._id);
	}
});

Template.allPassList.helpers({
	'passes': function() {
		return Passes.find({}, {sort: {createdDate: -1}}).fetch();
	}
});

Template.allPassList.rendered = function() {
	$.material.init();
};