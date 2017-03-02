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
    /*//var stateC = new state.FinalState("C", regional);
    //stateB.to(stateC);
    //stateC.to(terminal);
    // create a state machine instance
    //var instance = new state.StateMachineInstance("test");
    // initialise the model and instance
    //state.initialise(machine, instance);
    //console.log("Created and Initialised machine");
    terminal = new state.PseudoState("terminal", machine, state.PseudoStateKind.Terminate);
    stateA = new state.State("A", machine);
    initial = new state.PseudoState("initial", machine, state.PseudoStateKind.Initial);
    initial.to(stateA);
    var stateB = new state.State("B", machine);
    stateA.to(stateB);
    stateB.to(terminal);
    var jsonObject = new state.JSONInstance("jsonInstance");
    //state.initialise(machine, jsonObject);
    //state.evaluate(machine, jsonObject, "");
    jsonString = jsonObject.toJSON();
    var regional = machine.getDefaultRegion();
      let myList = regional.vertices;
      console.log("Vertices: " + regional.vertices);
      console.log("Raw first in Vertices: " + stateA);
      console.log("Type of state: " + typeof stateA);
      console.log("Regions of state: " +  stateA.regions);
    if (jsonString){
      console.log("Created Json Passer");
      console.log("JSON: "+jsonString);
      myTest = jsonObject.fromJSON(jsonString);
      console.log("Json Object Breakdown: " + jsonObject );
      if (myTest){
        console.log("~~~~~~~~~~~~");
        console.log(myTest);
        console.log(myTest.name);
        console.log(myTest.children);
        let arr = myTest.children;
        console.log(arr[0]);
        console.log("Region Type: " + typeof arr[0]);
        console.log("Vertice Test: " + arr[0].vertices);
        console.log("~~~~~~~~~~~~");
      }
      else console.log("No Json");
    }*/
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
  }//end loadworkflow
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
