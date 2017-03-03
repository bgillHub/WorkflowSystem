if (Meteor.isClient) {
  Meteor.startup(function () {
    var state = require('state.js');
    wfName = "WorkflowNew";
    state.setConsole(console);
    machine = new state.StateMachine("machine");
    initial = new state.PseudoState("initial", machine, state.PseudoStateKind.Initial);
    terminal = new state.PseudoState("terminal", machine, state.PseudoStateKind.Terminate);
    statesArray = [];
    currentWorkflow = "Workflow";

    console.log("Proof that Workflows Exists:" + Workflows.find().fetch());
    console.log("Meteor Executed Client Code. Created StateMachine");
    console.log("Meteor started as Client with Browserify");
  });//end startup
}// if is client

if (Meteor.isServer) {
  Meteor.methods({
    'saveWorkflow': function (Name){
      var state = require('state.js');
      state.setConsole(console);
      let verticesArray = machine.getDefaultRegion().vertices;
      console.log("Vertices from default region: " + verticesArray);
      console.log("States from current array: " + statesArray);
      /*for (i in verticesArray){
        statesArray.push(i.name);
        console.log("State Name: " + i.name);
      }*/
      Workflows.insert({
        workflowName: Name,
        States: statesArray
      });
      /*Workflows.update(
        {workflowName: Name},
        {
        workflowName: Name,
        States: statesArray
      },
      {upsert: true});*/
    },//end  saveWorkflow
    'addState': function (Name, Type){
      var state = require('state.js');
      state.setConsole(console);
      newState = new state.State(Name, machine);
      /*initial = new state.PseudoState("initial", machine, state.PseudoStateKind.Initial);
      terminal = new state.PseudoState("terminal", machine, state.PseudoStateKind.Terminate);
      if (Type == "Initial"){
        initial.to(newState);
      }
      else if (Type == "Final"){
        newState.to(terminal);
      }*/
      statesArray.push(Name);
      StatesList.insert({
        stateName: Name,
        stateType: Type
      });
      var instance = new state.StateMachineInstance("progress");
      //state.initialise(machine, instance);
      console.log("Current Array: " + statesArray);
    },//end addState
    'loadStates' : function(){
      var deleteQuery = StatesList.findOne({ name: deleteName});
    },
    'loadWorkflow' : function(selectedFlow){
      console.log("Calling Load Function");
      var state = require('state.js');
      state.setConsole(console);
      statesArray = [];
      holdArray = selectedFlow.States;
      for (i in holdArray){
        statesArray.push(String(i));
      }
      machine = new state.StateMachine(selectedFlow.workflowName);
        for (i in statesArray){
          dynamicState = new state.State(i, machine);
        }
        console.log("New Machine Loaded with Vertices: "+ machine.getDefaultRegion().vertices);
        console.log("New Machine Loaded with Vertices: "+ statesArray);
      } //end loadworkflow
  });//end methods
}//end is server

Meteor.methods({
    'saveWorkflow': function (Name){
      var state = require('state.js');
      state.setConsole(console);
      let verticesArray = machine.getDefaultRegion().vertices;
      console.log("Vertices from default region: " + verticesArray);
      /*for (i in verticesArray){
        statesArray.push(i);
        console.log("State Name: " + i.name);
      }*/
      Workflows.insert({
        workflowName: Name,
        States: statesArray
      });
      /*Workflows.update(
        {workflowName: Name},
        {
        workflowName: Name,
        States: statesArray
      },
      {upsert: true});*/
    },//end  saveWorkflow
  'addState': function (Name, Type){
    var state = require('state.js');
    state.setConsole(console);
    newState = new state.State(Name, machine);
    /*initial = new state.PseudoState("initial", machine, state.PseudoStateKind.Initial);
    terminal = new state.PseudoState("terminal", machine, state.PseudoStateKind.Terminate);
    if (Type == "Initial"){
      initial.to(newState);
    }
    else if (Type == "Final"){
      newState.to(terminal);
    }*/
    statesArray.push(Name);
    StatesList.insert({
      stateName: Name,
      stateType: Type
    });
    var instance = new state.StateMachineInstance("progress");
    //state.initialise(machine, instance);
    console.log("Current Array: " + statesArray);
  },//end addState
  'loadWorkflow' : function(selectedFlow){
    console.log("Calling Load Function");
    var state = require('state.js');
    state.setConsole(console);
    statesArray = [];
    console.log("Selected Flow Found");
    holdArray = selectedFlow.States;
    for (i in holdArray){
      statesArray.push(String(i));
    }
    machine = new state.StateMachine(selectedFlow.workflowName);
      for (i in statesArray){
        dynamicState = new state.State(i, machine);
      }
      console.log("New Machine Loaded with Vertices: "+ machine.getDefaultRegion().vertices);
      console.log("New Machine Loaded with Vertices: "+ statesArray);
}//end loadworkflow
});//end methods
