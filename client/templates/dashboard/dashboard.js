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
  'click #wfLabel': function(e){
    e.preventDefault();
    console.log("You  selected wfdrop");
    WFCursor = Workflows.find().fetch();
    //WFArray.push(WorkflowsList.find().fetch());
    //console.log("Array " + WFArray);
    wfContainer = document.getElementById("wfDrop");
    wfContainer.innerHTML = null;
    // var add = document.createDocumentFragment();
    var a = 0;
    for (i in WFCursor) {
      name = WFCursor[i].workflowName;
      console.log("Item " + i);
      wfContainer.innerHTML +=  '<option>'+ name +'</option>';
      a++
    }
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
    Meteor.call('loadWorkflow');}
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
});//end events

function changeWF() {
  console.log("Function Called");
  Meteor.call('loadWorkflow', getElementById('wfDrop').value);
}

Template.dashboardPage.onRendered( function () {
  console.log('rendered dash');
});//end on rendered
