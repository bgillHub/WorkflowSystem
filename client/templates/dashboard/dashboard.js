Template.dashboardPage.events({
  'click #createStateButton': function(e){
    e.preventDefault();
    selectedFlow = Workflows.findOne();
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
  'click .viewWorkflowArea': function(e) {
    e.preventDefault();
    console.log("You pressed the Monitor Workflow button");
    /*if (machine){
      console.log("Current Workflow: " + machine.name);
    }*/
    Router.go("/modifyWorkflow");
  }
});
