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
  'click .viewWorkflowArea': function(e) {
    e.preventDefault();
    selectedFlow = Workflows.findOne({workflowName: wfName});
    if (selectedFlow != null){
    Meteor.call('loadWorkflow', selectedFlow);}
    else {
      console.log("No Workflow Found");
    }
    console.log("You pressed the Monitor Workflow button");
    Router.go("/selectWorkflow");
  },
  'click .createWorkflowArea': function(e) {
    e.preventDefault();
    console.log("You pressed the Create Workflow Button")
    Router.go("/createWorkflow");
  },
  'click .logo': function(e){
    e.preventDefault();
    Router.go("/");
  }
});
