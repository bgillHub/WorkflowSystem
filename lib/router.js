// Router.route('/');
// Router.configure({ layoutTemplate: 'layout'});

// Main Router for the homepage
Router.route('/', function () {
  this.render('dashboardPage');
});

Router.route('createState', {
  name : "createState",
	onBeforeAction: function() {
<<<<<<< HEAD
      this.next();
			Router.go("createState");
	}
});

Router.route('createTrans', {
  name : "createTrans",
	onBeforeAction: function() {
      this.next();
			Router.go("createTrans");
=======
			Router.go("dashboardPage");
>>>>>>> 9758ff05df16406ee208c58871d86a3fb17e3fdf
	}
});

Router.route('dashboardPage', {
  name : "dashboardPage",
	onAfterAction: function() {
<<<<<<< HEAD
			this.render('dashboardPage');
	}
});

Router.route('modifyWorkflow', {
  name : "modifyWorkflow",
	onAfterAction: function() {
			this.render('modifyWorkflow');
=======
			this.render('createState');
>>>>>>> 9758ff05df16406ee208c58871d86a3fb17e3fdf
	}
});
