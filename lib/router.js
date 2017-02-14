// Router.route('/');
// Router.configure({ layoutTemplate: 'layout'});

// Main Router for the homepage
Router.route('/', function () {
  this.render('dashboardPage');
});

Router.route('createState', {
  name : "createState",
	onBeforeAction: function() {
			Router.go("dashboardPage");
	}
});

Router.route('dashboardPage', {
  name : "dashboardPage",
	onAfterAction: function() {
			this.render('createState');
	}
});
