if (Meteor.isClient) {
  Meteor.startup(function () {
    var state = require('state.js');
    state.setConsole(console);
    machine = new state.StateMachine("machine");
    var initial = new state.PseudoState("initial", machine, state.PseudoStateKind.Initial);
    var terminal = new state.PseudoState("terminal", machine, state.PseudoStateKind.Terminate);
    console.log("Begin Test");
    var stateA = new state.State("A", machine);
    initial.to(stateA);
    var stateB = new state.State("B", machine);
    stateA.to(stateB);
    var stateC = new state.State("C", machine);
    stateB.to(stateC);
    stateC.to(terminal);
    // create a state machine instance
    var instance = new state.StateMachineInstance("test");
    // initialise the model and instance
    state.initialise(machine, instance);
    regional = machine.getDefaultRegion();
    if (regional!= null){
      console.log("Default Region exists");
      console.log("Vertices: " + regional.vertices);
    }
  }); //end startup
} // if is client

if (Meteor.isServer) {
  Meteor.methods({
    'saveWorkflow': function (){
      var state = require('state.js');
      state.setConsole(console);
      var jsonObject = new state.JSONInstance("jsonInstane");
      state.initialise(machine, jsonObject);
      jsonString = jsonObject.toJSON();
      if (jsonString){
        console.log("Created Json Passer");
        console.log(jsonString);
      }
      else {console.log("JSON instance found empty");}
      console.log("Workflow JSON Created on Server Method: " + newState.name);
    },//end  saveWorkflow
    'addState': function (Name, Type){
      var state = require('state.js');
      state.setConsole(console);
      newState = new state.State(Name, machine);
      if (Type == "Initial"){
        var initial = new state.PseudoState("initial", machine, state.PseudoStateKind.Initial);
        initial.to(newState);
      }
      else if (Type == "Final"){
        var terminal = new state.PseudoState("terminal", machine, state.PseudoStateKind.Terminate);
        newState.to(terminal);
      }
      var instance = new state.StateMachineInstance("progress");
      state.initialise(machine, instance);
      console.log("Vertices: " + machine.getDefaultRegion().vertices);
    }//end addState
  });//end methods

}//end is server
Meteor.methods({
  'saveWorkflow': function (){
    var state = require('state.js');
    state.setConsole(console);
    var jsonObject = new state.JSONInstance("jsonInstane");
    state.initialise(machine, jsonObject);
    jsonString = jsonObject.toJSON();
    if (jsonString){
      console.log("Created Json Passer");
      console.log(jsonString);
    }
    else {console.log("JSON instance found empty");}
    console.log("Workflow JSON Created on Client Method: " + newState.name);
  },//end  saveWorkflow
  'addState': function (Name, Type){
    var state = require('state.js');
    state.setConsole(console);
    newState = new state.State(Name, machine);
    if (Type == "Initial"){
      var initial = new state.PseudoState("initial", machine, state.PseudoStateKind.Initial);
      initial.to(newState);
    }
    else if (Type == "Final"){
      var terminal = new state.PseudoState("terminal", machine, state.PseudoStateKind.Terminate);
      newState.to(terminal);
    }
    var instance = new state.StateMachineInstance("progress");
    state.initialise(machine, instance);
    console.log("Vertices: " + machine.getDefaultRegion().vertices);
  }//end addState
});//end methods
