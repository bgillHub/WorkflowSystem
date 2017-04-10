// Router.route('/');
// Router.configure({ layoutTemplate: 'layout'});

// Main Router for the homepage
Router.route('/', function () {
  this.render('loginPage');
});

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

Router.route('dashboardPage', {
  name : "dashboardPage",
	onAfterAction: function() {
			// this.render('dashboardPage');
      if(Meteor.userId()){
        this.render('dashboardPage');
      } else {
        Router.go("loginPage");
  	  }
	}
});

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

Router.route('createAccount', {
  name: "createAccount",
  onAfterAction: function() {
    this.render('createAccount')
  }
});

Router.route('loginPage', {
  name: 'loginPage',
  onAfterAction: function() {
    this.render('loginPage');
  }
});
