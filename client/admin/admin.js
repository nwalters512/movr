Template.adminLayout.rendered = function() {

	function resizeAdminPanel() {
		var navHeight = $("nav.navbar").height();
		$("div.admin").css({top: navHeight});
	};

	resizeAdminPanel();

	$(window).resize(function() {
		resizeAdminPanel();
	});
};