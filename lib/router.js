// Router.route('/');
// Router.configure({ layoutTemplate: 'layout'});

// Main Router for the homepage
Router.route('/', function () {
  this.render('dashboardPage');
});

Router.route('createState', {
  name : "createState",
	onBeforeAction: function() {
      this.next();
			Router.go("createState");
	}
});

Router.route('createTrans', {
  name : "createTrans",
	onBeforeAction: function() {
      this.next();
			Router.go("createTrans");
	}
});

Router.route('dashboardPage', {
  name : "dashboardPage",
	onAfterAction: function() {
			this.render('dashboardPage');
	}
});

Router.route('modifyWorkflow', {
  name : "modifyWorkflow",
	onAfterAction: function() {
			this.render('modifyWorkflow');
	}
});
