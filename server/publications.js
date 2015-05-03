// Publish student data
Meteor.publish("students", function() {
	if(Roles.userIsInRole(this.userId, ['admin'])) {
		return Meteor.users.find({ roles: { $in: ['student']}}, 
			{fields: {'emails': 1, 'profile': 1, 'roles': 1}});
	}
	
	this.stop();
	return;
});

Meteor.publish("teachers", function() {
	if(Roles.userIsInRole(this.userId, ['admin'])) {
		return Meteor.users.find({ roles: { $in: ['teacher']}}, 
			{fields: {'emails': 1, 'profile': 1, 'roles': 1}});
	}
	
	this.stop();
	return;
});

Meteor.publish("passes", function() {
	var studentId = Meteor.users.findOne({_id: this.userId}).profile.studentId;
	if(studentId) {
		return Passes.find({owner: studentId});
	} else if (Roles.userIsInRole(this.userId, ['admin'])) {
		// Admins can view all passes
		return Passes.find({});
	}

	throw new Meteor.error(403, "You do not have permission to view passes!");
});

// Publish locations to all users
Meteor.publish(null, function() {
	return Locations.find({});
});