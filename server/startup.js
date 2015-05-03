Meteor.startup(function() {
    console.log("User count: " + Meteor.users.find().count());

    if (Meteor.users.find().count() === 0) {
        var id = Accounts.createUser({
            email: 'nwalters512@gmail.com',
            password: 'adminPassword',
            profile: {
                firstName: "Nathan",
                lastName: "Walters"            }
        });

        console.log("Default user created!");

        Roles.addUsersToRoles(id, 'admin');
    }
});
