if(Meteor.isClient) {
	Template.students.helpers({
		students: function() {
			return Meteor.users.find({ roles: { $in: ['student']}});
		}
	});

	Template.adminLayout.rendered = function() {

		function resizeAdminPanel() {
			var navHeight = $("nav.navbar").height();
			console.log("nav height: " + navHeight);
			console.log("div.admin: " + $("div.admin").toString());
			$("div.admin").css({top: navHeight});
			console.log("Resized!");
		};

		resizeAdminPanel();

		$(window).resize(function() {
			resizeAdminPanel();
		});
	};
}