<<<<<<< HEAD
=======
//var state = require("state.js");
>>>>>>> 9758ff05df16406ee208c58871d86a3fb17e3fdf
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
<<<<<<< HEAD
=======
    if (Meteor.isServer) {
    }
    else {
      //Meteor.call('createState');
      console.log("State Not Created");
    }
>>>>>>> 9758ff05df16406ee208c58871d86a3fb17e3fdf
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
<<<<<<< HEAD
    Router.go("/modifyWorkflow");
=======
>>>>>>> 9758ff05df16406ee208c58871d86a3fb17e3fdf
  },
  'click #backButton': function(e){
    e.preventDefault();
    console.log("You pressed the back button");
    Router.go("/");
  } // end backButton
});
