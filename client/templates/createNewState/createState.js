//var state = require("state.js");
Template.createState.events({
  'click #createButton': function(e) {
    e.preventDefault();
    var name = document.getElementById("nameField").value;
    var stateTime = document.getElementById("stateTime").value;
    console.log("TIME : " + stateTime)
    //const pred = document.getElementById("loopTaskField").value;
    if (document.getElementById("initialRadio").checked) {
      var stateType = "Initial";
    } else if (document.getElementById("normalRadio").checked) {
      var stateType = "Normal";
    } else if (document.getElementById("finalRadio").checked) {
      var stateType = "Final";
    }
    StatesList.insert({
      name: name,
      time: stateTime,
      type: stateType
    });
    if (Meteor.isServer) {
      console.log("Calling Add Method");
      Meteor.call('addState', name, stateType);
      console.log("State Inserted On Server Method");
    }
    else {
      console.log("Calling Add Method");
      Meteor.call('addState', name, stateType);
      console.log("State Inserted On Client Method");
    }
  }, // end createButton
  'click #clearButton': function(e){
    e.preventDefault();
    console.log("You pressed the clear button");
    document.getElementById("createForm").reset();
    name = "";
    stateType = "";
    stateTime = "";
  }, // end clearButton
  'click #viewButton': function(e) {
    e.preventDefault();
    console.log("You pressed the view states button");
    //console.log("Workflow Name: " + Workflows.findOne({}).workflowName);
    console.log("Workflow Array: " + Workflows.find({}));
    for (i in StatesList.find().fetch()){
      console.log("State Name: " + i);
    }
    // Router.go("/modifyWorkflow");
  },
  'click #backButton': function(e){
    //Meteor.call('saveWorkflow', wfName);
    e.preventDefault();
  //  Meteor.call('saveWorkflow', wfName);
  console.log("Updating Workflow");
  /*Workflows.insert({
    workflowName: wfName,
    States: statesArray
  });*/
  var foundObject = Workflows.findOne({workflowName:wfName});
    Workflows.update(
   {_id:foundObject._id},
   {workflowName: wfName, States: statesArray, Transitions: []},
    {upsert: true}
  );

    console.log("ALL WORKFLOW NAMES: " + Workflows.find({}).fetch());
    //console.log("SAMPLE WORKFLOW NAME: " + Workflows.findOne().workflowName);
    //console.log("SAMPLE WORKFLOW STATES: " + Workflows.findOne({}).States);
    console.log("You pressed the back button");
    Router.go("/");
  } // end backButton
});
