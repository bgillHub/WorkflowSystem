//var state = require("state.js");
Template.createState.events({
  'click #createButton': function(e) {
    e.preventDefault();
    var name = document.getElementById("nameField").value;
    var stateTime = document.getElementById("stateTime").value;
    console.log("TIME : " + stateTime)
    if (document.getElementById("initialRadio").checked) {
      var stateType = "Initial";
    } else if (document.getElementById("normalRadio").checked) {
      var stateType = "Normal";
    } else if (document.getElementById("finalRadio").checked) {
      var stateType = "Final";
    }
    wfDoc = Workflows.findOne({workflowName: wfName});
    var insertedState = {name: name, type: stateType};
    StatesList.insert(insertedState, function(err, reference){
      if (err) {console.log("Error: " + err); return;}
      else {
        console.log("Object inserted!");
        console.log("Attempt One: " + reference[0]._id);
        console.log("Attempt Two: " + insertedState._id);
        console.log("Attempt Three: " + StatesList.findOne({name: name})._id);
         var newid = StatesList.findOne({name: name})._id // this will return the id of object inserted
         var newArray = wfDoc.States;
         newArray.push(newid);
         Workflows.update({_id: wfDoc._id}, {$set: {States: newArray}});
         console.log("StatesList Updated, Object ID: " + newid);
         Meteor.call('createState', name, stateType);
       }
      // Object inserted successfully.
      document.getElementById("createForm").reset();
      name = "";
      stateType = "";
      stateTime = "";
    });//end callback

    /*StatesList.insert({
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
    } */

  }, // end createButton
  'click #clearButton': function(e){
    e.preventDefault();
    document.getElementById("createForm").reset();
    name = "";
    stateType = "";
    stateTime = "";
  }, // end clearButton
  'click #viewButton': function(e) {
    e.preventDefault();
    //console.log("Workflow Name: " + Workflows.findOne({}).workflowName);
    Meteor.call('saveWorkflow');
    Router.go("/createTrans");
  },
  'click #cancelButton': function(e){
    //Meteor.call('saveWorkflow', wfName);
    e.preventDefault();
    Meteor.call('saveWorkflow');
    console.log("Updating Workflow");
    /*Workflows.insert({
      workflowName: wfName,
      States: statesArray
    });*/
    console.log("ALL WORKFLOW NAMES: " + Workflows.find({}).fetch());
    Router.go("/");
  }, // end cancelButton
  'click .logo': function(e){
    e.preventDefault();
    Router.go("/");
  }
});
