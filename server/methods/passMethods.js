Meteor.methods({
	createPass: function(passData) {
		// Figure out who the owner of the pass should be
		// If it is specifid in the 'owner' field of passData, use that
		// Otherwise, if the current user is a student, use their ID
		var ownerVal;
		if (passData.owner) {
			ownerVal = passData.owner;
		} else {
			if (Roles.userIsInRole(this.userId, ['student'])) {
				ownerVal = Meteor.user().profile.studentId;
			} else {
				throw new Meteor.Error(403, "Passes can only be owned by students; you are not a student or did not provide a valid student ID.");
			}
		}

		console.log("Creating pass with owner: " + ownerVal);

		Passes.insert({
			passDate: passData.passDate,
			createdDate: new Date(),
			destination: passData.destination,
			owner: ownerVal
		});
	},

	deletePass: function(passId) {
		var pass = Passes.findOne({_id: passId});
		var studentId;
		if(Roles.userIsInRole(Meteor.user(), ['student'])) {
			studentId = Meteor.users.findOne({_id: this.userId}).profile.studentId;
		}
		if (Roles.userIsInRole(this.userId, ['delete-pass', 'admin']) || pass.owner === studentId) {
			Passes.remove(passId);
		} else {
			throw new Meteor.Error(403, "403: Permission Denied", "You do not have permission to delete this pass.");
		}	
	}
});