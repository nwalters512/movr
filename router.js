// Routing stuff goes here
Router.route('/', function() {
	// Default to the "all page
	this.render('Home');
}, {
	name: 'home'
});

Router.route('/login', function() {
	this.layout('AppLayout');
	this.render('login', {to: 'content'});
});

Router.route('/app', function() {
	this.redirect('/app/passes/all');
})

Router.route('/app/admin', function() {
	this.layout('AdminLayout');
});

Router.route('/app/admin/students', function() {
	this.layout('AdminLayout');
	this.render('students', {to: 'content'});
});

Router.route('/app/admin/students/new', function() {
	this.layout('AdminLayout');
	this.render('newStudent', {to: 'content'});
});

Router.route('/app/passes/all', function() {
	this.layout('AppLayout');
	this.render('allPassList', {to: 'content'});
});

Router.route('/app/passes/new', function() {
	this.layout('AppLayout');
	this.render('newPass', {to: 'content'});
});

Router.route('/app/passes/pending', function() {
	this.layout('AppLayout');
	this.render('pendingPassList', {to: 'content'});
});

// Redirect to login page if trying to access app and not logged in
loginRedirect = function() {
	if (!Meteor.userId()) {
		this.redirect('/login');
	} else {
		this.next();
	}
};

Router.onBeforeAction(loginRedirect, {
	only: ['/app/(.*)']
});