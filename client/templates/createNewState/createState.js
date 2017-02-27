//var state = require("state.js");
Template.createState.events({
  'click #createButton': function(e) {
    e.preventDefault();
    console.log("You pressed the create button");
    var name = document.getElementById("nameField").value;
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
      type: stateType
    });
    console.log(name + ","  + "," + "," + stateType);
    if (Meteor.isServer) {
      console.log("Calling Method");
      Meteor.call('addState', name, stateType);
      console.log(Workflows.find().fetch());
      console.log("State Inserted On Server Method");
    }
    else {
      console.log("Calling Method");
      Meteor.call('addState', name, stateType);
      console.log("Workflows " +Workflows.find().fetch());
      console.log("State Inserted On Client Method");
    }
  }, // end createButton
  'click #clearButton': function(e){
    e.preventDefault();
    console.log("You pressed the clear button");
    document.getElementById("createForm").reset();
    name = "";
    stateType = "";
  }, // end clearButton
  'click #viewButton': function(e) {
    e.preventDefault();
    console.log("You pressed the view states button");
    if (StatesList == Workflows){
      console.log("The DBs are the same...");
    }
    console.log("Workflow Array: " + Workflows.find().fetch());
    console.log("Workflow Array: " + Workflows.find());
    console.log("States Array: " + StatesList.find().fetch());
    console.log("States Array: " + StatesList.find());
    for (i in StatesList.find().fetch()){
      console.log("State Name: " + i.name);
    }
    // Router.go("/modifyWorkflow");
  },
  'click #backButton': function(e){
    Meteor.call('saveWorkflow');
    Workflows.update(
      {workflowName: machine.name},
      {
      workflowName: machine.name,
      stateJson: jsonString
    },{upsert: true}
  );
    e.preventDefault();
    console.log("You pressed the back button");
    Router.go("/");
  } // end backButton
});
