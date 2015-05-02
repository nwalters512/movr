Router.route('/app/admin', function() {
}, {
	controller: 'AdminController'
});

Router.route('/app/admin/students', function() {
	this.render('students', {to: 'content'});
}, {
	controller: 'AdminController'
});

Router.route('/app/admin/students/new', function() {
	this.render('newStudent', {to: 'content'});
}, {
	controller: 'AdminController'
});

Router.route('/app/admin/teachers', function() {
}, {
	controller: 'AdminController'
});

Router.route('/app/admin/administrators', function() {
}, {
	controller: 'AdminController'
});

Router.route('/app/admin/locations', function() {
	this.render('locations', {to: 'content'});
}, {
	controller: 'AdminController'
});

Router.route('/app/admin/locations/new', function() {
	this.render('newLocation', {to: 'content'});
}, {
	controller: 'AdminController'
});