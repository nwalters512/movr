Meteor.methods({
    createTeacher: function(userData) {

        // Throw an error if someone attemps to create a teacher with the email
        // of an existing teacher
        if (Meteor.users.find({
                "emails": {
                    $elemMatch: {address: userData.email}
                }
            }).count() > 0) {
            throw new Meteor.Error(403, "A teacher already exists with the given email. Emails must be unique.");
        }

        var id = Accounts.createUser({
            email: userData.email,
            password: userData.password,
            profile: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                seminarLocation: userData.seminarLocation
            }

        });

        Roles.addUsersToRoles(id, ['teacher']);
    }
});
