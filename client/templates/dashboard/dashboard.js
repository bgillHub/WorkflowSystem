Template.dashboardPage.events({
  'click #createStateButton': function(e){
    e.preventDefault();
    console.log("You pressed Go To Create State button");
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
    if (model){
      console.log("Current Workflow: " + model.name);      
    }
    Router.go("/modifyWorkflow");
  }
});
