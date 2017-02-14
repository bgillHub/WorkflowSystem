//var state = require("state.js");
Template.createState.events({
  'click #createButton': function(e) {
    e.preventDefault();
    console.log("You pressed the create button");
    var name = document.getElementById("nameField").value;
    //const pred = document.getElementById("loopTaskField").value;
    var loopTask = document.getElementById("loopTaskField").value;
    var next = document.getElementById("nextStateField").value;
    if (document.getElementById("initialRadio").checked) {
      var stateType = "Initial";
    } else if (document.getElementById("normalRadio").checked) {
      var stateType = "Normal";
    } else if (document.getElementById("finalRadio").checked) {
      var stateType = "Final";
    }
    StatesList.insert({
      name: name,
      loopTask: loopTask,
      nextState: next,
      type: stateType
    });
    console.log(name + ","  + loopTask + "," + next + "," + stateType);
    if (Meteor.isServer) {
    }
    else {
      //Meteor.call('createState');
      console.log("State Not Created");
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
  },
  'click #backButton': function(e){
    e.preventDefault();
    console.log("You pressed the back button");
    Router.go("/");
  } // end backButton
});
