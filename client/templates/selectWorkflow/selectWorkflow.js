Template.selectWorkflow.events({

  'click #backButton': function(e){
    e.preventDefault();
    console.log("You pressed the back button");
    Router.go("/dashboardPage");
  },

  'click .logo': function(e){
    e.preventDefault();
    Router.go("/dashboardPage");
  },

  'click #viewButton': function(e){
    e.preventDefault();
    Router.go("/viewWorkflow");
  },

  'click .logoutLink': function(e) {
    e.preventDefault();
    Meteor.logout();
    Router.go("/loginPage");
  }
});

// Automatically loads the workflow dropdown without having a populate button 
Template.selectWorkflow.onRendered( function () {
  var user = Meteor.user().profile.name;

  nameContainer = document.getElementById("logout");
  nameContainer.innerHTML +=  '<p id="user">'+user+'</p>';
  console.log(user);

  WFCursor = Workflows.find({Users: String(Meteor.userId())}).fetch();
  wfContainer = document.getElementById("wfDrop");
  wfContainer.innerHTML = null;
  var a = 0;
  for (i in WFCursor) {
    name = WFCursor[i].workflowName;
    wfContainer.innerHTML +=  '<option>'+ name +'</option>';
    a++
  }
});

Template.selectWorkflow.rendered = function() {
  console.log("You  selected wfdrop");
  WFCursor = Workflows.find().fetch();
  wfContainer = document.getElementById("wfDrop");
  wfContainer.innerHTML = null;
  var a = 0;
  for (i in WFCursor) {
    name = WFCursor[i].workflowName;
    wfContainer.innerHTML +=  '<option>'+ name +'</option>';
    a++
  }
}
