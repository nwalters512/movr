Template.seminarSignInOut.helpers({
    whichTemplate: function() {
        var inProgress = Session.get('signInOutInProgress');
        var signingIn = Session.get('signInOutSigningIn');
        var signingOut = Session.get('signInOutSigningOut');
        var signInOutComplete = Session.get('signInOutComplete');
        if (!inProgress) {
            // Sign in/out flow not begun yet. Show the "enter id" screen
            return 'seminarWelcome';
        } else if (!signingIn && !signingOut) {
            // Student has not yet selected if they're signing in or signing out
            return 'seminarSelectSignInOrOut';
        } else if (signingIn && !signInOutComplete) {
            return 'seminarSignIn';
        } else if (signingIn && signInOutComplete) {
            return 'seminarSignInComplete';
        } else if (signingOut && !signInOutComplete) {
            return 'seminarSignOut';
        } else if (signingOut && signInOutComplete) {
            return 'seminarSignOutComplete';
        }
    }
});

var resetSignInOutSessionVariables = function() {
    Session.set('signInOutInProgress', null);
    Session.set('signInOutSigningIn', null);
    Session.set('signInOutSigningOut', null);
    Session.set('invalidStudentId', null);
    Session.set('signInOutUser', null);
    Session.set('signInOutStudentId', null);
    Session.set('signInOutComplete', null);
};

Template.seminarSignInOut.onRendered(function() {
    // Reset all relevant session variables
    resetSignInOutSessionVariables();
});

Template.seminarWelcome.helpers({
    invalidStudentId: function() {
        return Session.get('invalidStudentId');
    }
});

Template.seminarWelcome.events({
    'click .btn-submit-id': function() {
        var id = $('.seminar-welcome #student-id').val();
        Session.set('signInOutStudentId', id);
        console.log("Student id: " + id);

        Meteor.call('getStudentById', id, function(error, result) {
            if (!result) {
                Session.set('invalidStudentId', true);
                return;
            }

            console.log(result.profile.firstName);

            Session.set('signInOutUser', result);

            // Setting this to 'true' will advance to the next screen.
            Session.set('signInOutInProgress', true);
        });
    }
});

Template.seminarSelectSignInOrOut.helpers({
    studentName: function() {
        return Session.get('signInOutUser').profile.firstName;
    }
});

Template.seminarSelectSignInOrOut.events({
    'click .btn-sign-in': function() {
        Session.set('signInOutSigningIn', true);
        Session.set('signInOutComplete', true);

        // Return to the main screen after 2 seconds
        Meteor.setTimeout(resetSignInOutSessionVariables, 2000);
    },

    'click .btn-sign-out': function() {
        Session.set('signInOutSigningOut', true);
    },

    'click .btn-cancel': function() {
        resetSignInOutSessionVariables();
    }
});

Template.seminarSignOut.helpers({
    studentHasPassesForToday: function() {
        var studentId = Session.get('signInOutUser').profile.studentId;
        return (Passes.find({
            owner: studentId
        }).count() > 0);
    },

    todaysDestinations: function() {
        var studentId = Session.get('signInOutUser').profile.studentId;
        return Passes.find({
            owner: studentId
        });
    }
});

Template.seminarSignOut.events({
    'click .btn-ok': function() {
        // Return to the main screen
        resetSignInOutSessionVariables();
    },

    'click li': function(event, template) {
        console.log("Clicked: " + this.destination);
        Session.set('signInOutComplete', true);

        // Return to the main screen after 3 seconds
        Meteor.setTimeout(resetSignInOutSessionVariables, 3500);
    }
});
