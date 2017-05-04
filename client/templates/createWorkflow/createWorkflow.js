Template.createWorkflow.events({

  // Create Workflow Event
  'click #createButton': function(e) {
    e.preventDefault();
    var name = document.getElementById("nameField").value;
    wfName = name;
    var profile = String(Meteor.userId());
    console.log("User id: " +profile);

    // Inserts a workflow name, with an empty set of states & transitions for now
    Workflows.insert({workflowName: wfName,
    States: [],
    Transitions: [],
    Admin: profile,
    Users: [profile] });
    /*Workflows.update({workflowName: wfName},{
      workflowName: wfName,
      States: [],
      Transitions: []
    },{upsert : true});*/

    // Workflow is specific to a user
    WorkflowsList.insert({
      name: name
    });
    Meteor.call('createMachine', name);
    Router.go("/createState");
  },
  'click #clearButton': function(e) {
    e.preventDefault();
    document.getElementById("createForm").reset();
    name = "";
  },
  'click #cancelButton': function(e) {
    e.preventDefault();
    Meteor.call('saveWorkflow');
    Router.go("/dashboardPage");
  },
  'click .logo': function(e){
    e.preventDefault();
    Router.go("/dashboardPage");
  },
  'click .logoutLink': function(e) {
    e.preventDefault();
    Meteor.logout();
    Router.go("/loginPage");
  }
});

// Logout area in the upper right corner
Template.createWorkflow.onRendered( function () {
  var user = Meteor.user().profile.name;

  nameContainer = document.getElementById("logout");
  nameContainer.innerHTML +=  '<p id="user">'+user+'</p>';
  console.log(user);

});
