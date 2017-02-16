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
    /*StatesList.insert({
      stateName: name,
      type: stateType
    });*/
    console.log(name + ","  + "," + "," + stateType);
    if (Meteor.isServer) {
      Meteor.call('createState', name);
    }
    else {
      Meteor.call('createState', name);
    }
  }, // end createButton
  'click #clearButton': function(e){
    e.preventDefault();
    console.log("You pressed the clear button");
    document.getElementById("createForm").reset();
    name = "";
    loopTask = "";
    next = "";
    stateType = "";
  }, // end clearButton
  'click #viewButton': function(e) {
    e.preventDefault();
    console.log("You pressed the view button");
    console.log(StatesList.find().fetch());
    var doc = StatesList.findOne();
    if (doc){
      console.log("Sample Name: " + doc.stateName);
    }
    // Router.go("/modifyWorkflow");
  },
  'click #backButton': function(e){
    e.preventDefault();
    console.log("You pressed the back button");
    Router.go("/");
  } // end backButton
});
