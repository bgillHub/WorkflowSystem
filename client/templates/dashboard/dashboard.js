// All of the events on this page redirect you to the respective router 

Template.dashboardPage.events({
  'click #createStateButton': function(e){
    e.preventDefault();
    selectedFlow = Workflows.findOne({workflowName: wfName});
    if (selectedFlow != null){
    Meteor.call('loadWorkflow', selectedFlow);}
    else {
      console.log("No Workflow Found");
    }
    console.log("You pressed Go To Create State button, wfName: " + wfName);
    Router.go("/createState");
  },
  'click #createTransButton': function(e){
    e.preventDefault();
    console.log("You pressed Go To Create Transition button");
    Router.go("/createTrans");
  },
  'click #deleteWFButton': function(e){
    e.preventDefault();
    console.log("You pressed Go To Delete Workflow button");
    Router.go("/modifyWorkflow");
  },
  'click #editWFButton': function(e){
    e.preventDefault();
    if (machine != null){
      console.log("You pressed Edit Workflow button");
      Router.go("/createState");
    }
    else alert('No Workflow Selected!');
  },
  'click .selectWorkflowArea': function(e) {
    e.preventDefault();
    console.log("You pressed the View Workflow button");
    Router.go("/selectWorkflow");
  },
  'click .monitorWorkflowArea': function(e) {
    e.preventDefault();
    console.log("You pressed the Monitor Workflow button");
    Router.go("/viewWorkflow");
  },
  'click .createWorkflowArea': function(e) {
    e.preventDefault();
    console.log("You pressed the Create Workflow Button")
    Router.go("/createWorkflow");
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
});//end events

function changeWF() {
  console.log("Function Called");
  Meteor.call('loadWorkflow', getElementById('wfDrop').value);
}

Template.dashboardPage.onRendered( function () {
  var user = Meteor.user().profile.name;

  nameContainer = document.getElementById("logout");
  nameContainer.innerHTML +=  '<p id="user">'+user+'</p>';
  console.log(user);

});
