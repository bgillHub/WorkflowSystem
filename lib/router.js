/*
* This page contains the initialization and declaration of all of the page routers
* to navigate through FlexFlow. Iron Router was used to route the pages. User must be logged
* in to have access to the majority of the pages (with the exception of loginPage, and createAccount)
*/

// Main Router for the homepage set to login
Router.route('/', function () {
  this.render('loginPage');
});

// Create State page
Router.route('createState', {
  name : "createState",
	onBeforeAction: function() {
    if(Meteor.userId()){
      this.next();
      Router.go("createState");
    } else {
      Router.go("loginPage");
    }
	}
});

// Create transition page
Router.route('createTrans', {
  name : "createTrans",
	onBeforeAction: function() {
    this.render('createTrans');
    if(Meteor.userId()){
      this.next();
      Router.go("createTrans")
    } else {
      Router.go("loginPage");
	  }
  }
});

// Dashboard page
Router.route('dashboardPage', {
  name : "dashboardPage",
	onAfterAction: function() {
      if(Meteor.userId()){
        this.render('dashboardPage');
      } else {
        Router.go("loginPage");
  	  }
	}
});

// Create workflow page
Router.route('createWorkflow', {
  name: "createWorkflow",
  onAfterAction: function() {
    if(Meteor.userId()){
      this.render('createWorkflow');
    } else {
      Router.go("loginPage");
    }
  }
});

// Select workflow page
Router.route('selectWorkflow', {
  name : "selectWorkflow",
	onBeforeAction: function() {
      if(Meteor.userId()){
        this.render("selectWorkflow");
      } else {
        Router.go("loginPage");
      }
	}
});

// Modify workflow page
Router.route('modifyWorkflow', {
  name : "modifyWorkflow",
	onAfterAction: function() {
      if(Meteor.userId()){
        this.render('modifyWorkflow');
      } else {
        Router.go("loginPage");
      }
	}
});

// View workflow page
Router.route('viewWorkflow', {
  name: "viewWorkflow",
  onAfterAction: function() {
    if(Meteor.userId()){
      this.render('viewWorkflow');
    } else {
      Router.go("loginPage");
    }
  }
});

// Create account page
Router.route('createAccount', {
  name: "createAccount",
  onAfterAction: function() {
    this.render('createAccount')
  }
});

// Login page (needs to be declared even though it's set as default router initially)
Router.route('loginPage', {
  name: 'loginPage',
  onAfterAction: function() {
    this.render('loginPage');
  }
});

Router.route('addUser', {
  name: "addUser",
  onAfterAction: function() {
    if(Meteor.userId()){
      this.render('addUser');
    } else {
      Router.go("loginPage");
    }
  }
});
