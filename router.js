AppController = RouteController.extend({
    onBeforeAction: function() {
        if (!Meteor.userId()) {
            this.redirect('/login');
        } else {
            this.next();
        }
    }
});

AdminController = AppController.extend({
    layoutTemplate: 'AdminLayout',

    onBeforeAction: function() {
        if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            this.next();
        } else {
            this.next();
        }
    }
});

// Routing stuff goes here
Router.route('/', function() {
    // Default to the "all page
    this.render('Home');
}, {
    name: 'home'
});

Router.route('/login', function() {
    this.layout('AppLayout');
    this.render('login', {
        to: 'content'
    });
});

Router.route('/app', function() {
    this.redirect('/app/passes/all');
})

Router.route('/app/passes/all', function() {
    this.layout('AppLayout');
    this.render('allPassList', {
        to: 'content'
    });
});

Router.route('/app/passes/new', function() {
    this.layout('AppLayout');
    this.render('newPass', {
        to: 'content'
    });
});
