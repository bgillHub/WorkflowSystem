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
      // this.next();
			// Router.go("createTrans");
      this.render('createTrans');
	}
});

Router.route('dashboardPage', {
  name : "dashboardPage",
	onAfterAction: function() {
			this.render('dashboardPage');
	}
});

Router.route('createWorkflow', {
  name: "createWorkflow",
  onAfterAction: function() {
    this.render('createWorkflow');
  }
});

Router.route('selectWorkflow', {
  name : "selectWorkflow",
	onBeforeAction: function() {
			this.render("selectWorkflow");
	}
});

Router.route('modifyWorkflow', {
  name : "modifyWorkflow",
	onAfterAction: function() {
			this.render('modifyWorkflow');
	}
});

Router.route('viewWorkflow', {
  name: "viewWorkflow",
  onAfterAction: function() {
    this.render('viewWorkflow');
  }
});

Router.route('createAccount', {
  name: "createAccount",
  onAfterAction: function() {
    this.render('createAccount');
  }
});
