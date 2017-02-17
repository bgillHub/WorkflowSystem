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
    name = "";
    document.getElementById("createForm").reset();
    stateType
    console.log(name + "," + stateType);
    if (Meteor.isServer) {
    }
    else {
      Meteor.call('createState');
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
    console.log(StatesList.find().fetch());
    // Router.go("/modifyWorkflow");
  },
  'click #backButton': function(e){
    e.preventDefault();
    console.log("You pressed the back button");
    Router.go("/");
  } // end backButton
});
