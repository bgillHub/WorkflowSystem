if (Meteor.isClient) {
  Meteor.startup(function () {
    var state = require('state.js');
  //  wfName = "New";
    selectedFlow = Workflows.findOne();
    state.setConsole(console);
    statesArray = [];
    transArray=[];
    currentWorkflow = "Workflow";
    console.log("Proof that Workflows Exists:" + Workflows.find().fetch());
    console.log("Meteor Executed Client Code. Created StateMachine");
    console.log("Meteor started as Client with Browserify");
  }); //end startup
}// if is client

if (Meteor.isServer) {
  Meteor.methods({
    'createMachine': function(name){
      var state = require('state.js');
      wfName = name;
      statesArray = [];
      state.setConsole(console);
      machine = new state.StateMachine(name);
      initial = new state.PseudoState("initial", machine, state.PseudoStateKind.Initial);
      terminal = new state.PseudoState("terminal", machine, state.PseudoStateKind.Terminate);
      initial.to(terminal);
      var instance = new state.StateMachineInstance(name);
      state.initialise(machine, instance);
      alert("Machine Created and Initialsed");
    },
    'saveWorkflow': function (Name){
      var state = require('state.js');
      state.setConsole(console);
      let verticesArray = machine.getDefaultRegion().vertices;
      console.log("Vertices from default region: " + verticesArray);
      console.log("States from current array: " + statesArray);
    }, //end  saveWorkflow

    'addState': function (Name, Type){
      var state = require('state.js');
      state.setConsole(console);
      newState = new state.State(Name, machine);
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

    'loadWorkflow' : function(){
      selectedFlow = Workflows.findOne();
      console.log("Calling Load Function");
      var state = require('state.js');
      state.setConsole(console);
      statesArray = [];
      transArray=[];
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
      }, //end loadworkflow
  });//end methods
}//end is server

Meteor.methods({
  'createMachine': function(name){
    var state = require('state.js');
    wfName = name;
    statesArray = [];
    state.setConsole(console);
    machine = new state.StateMachine(name);
    initial = new state.PseudoState("initial", machine, state.PseudoStateKind.Initial);
    terminal = new state.PseudoState("terminal", machine, state.PseudoStateKind.Terminate);
    initial.to(terminal);
    var instance = new state.StateMachineInstance(name);
    state.initialise(machine, instance);
    alert("Machine Created and Initialsed");
  },
    'saveWorkflow': function (){
      var state = require('state.js');
      state.setConsole(console);
      let verticesArray = machine.getDefaultRegion().vertices;
      console.log("Vertices from default region: " + verticesArray);
      /*for (i in verticesArray){
        statesArray.push(i);
        console.log("State Name: " + i.name);
      }*/
      Workflows.insert({
        workflowName: machine.qualifiedName,
        States: statesArray,
        Transitions: transArray
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
  'loadWorkflow' : function(name){
    var state = require('state.js');
    state.setConsole(console);
    wfDoc = Workflows.findOne({workflowName: name});
    if (wfDoc != null){
      wfName = name;
      console.log("Workflow Found");
      machine = new state.StateMachine(wfDoc.workflowName);
      initial = new state.PseudoState("initial", machine, state.PseudoStateKind.Initial);
      terminal = new state.PseudoState("terminal", machine, state.PseudoStateKind.Terminate);
      console.log("Workflow Found Too");
      var nodeArray = wfDoc.States;
      for (i in nodeArray){
        console.log("First state: " + nodeArray[i]);
        var q = StatesList.findOne({_id: nodeArray[i]});
        var z =new state.State(q.name, machine);
        console.log("First Name Found");
        if (q.type == 'intial'){
          intial.to(z);
        }
        if (q.type == 'terminal'){
          terminal.to(z);
        }
      }//end for
      var tranArray = wfDoc.Transitions;
      /*for (i in tranArray){
        var code = tranArray[i];
        console.log("Found Code: " + code);
        var tranDoc = Transitions.findOne({_id: code});
        var first = StatesList.findOne({_id: tranDoc.source});
        var second = StatesList.findOne({_id: tranDoc.target});
        var firstNode = new state.State('blank', machine);
        var secondNode = new state.State('blank', machine);
        nodes = wfDoc.States;
        console.log("Found Node Code : " + code);
        console.log("Found Nodes: " + nodes);
        for (i in nodes){
          console.log("Found Node Itself: " + i);
          //console.log("Found Node NAME: " + nodes[i].name);
          if (i.qualifiedName == first.name) {
            firstNode = nodes[i];
            console.log("Second Name Found");
          }
          if (i.qualifiedName == second.name){
            console.log("Third Name Found");
            secondNode = nodes[i];
          }
        }//end each node check
        firstNode.to(secondNode);
        console.log('Transition processed');
      }// end each transition*/
      console.log('Workflow Loaded');
    }//end iff wfDoc
    else console.log('No workflow found...');
  },//end loadWorkflow
  //THE CURRENT LOAD WORKFLOW USED
  /*'loadWorkflow' : function(passedName){
    console.log("Calling My Load Function");
    var state = require('state.js');
    state.setConsole(console);
    statesArray = [];
    transArray =[];
    var selectedFlow = Workflows.findOne({workflowName: passedName});
    if (selectedFlow){
      console.log("Selected Flow Found WIth States:" + selectedFlow.States);
      console.log("Selected Flow Found WIth States:" + selectedFlow.Transitions);
    holdArray = selectedFlow.States;
    statesArray = selectedFlow.States;
    /*for (i in holdArray){
      statesArray.push(String(holdArray[i]));
    }
    machine = new state.StateMachine(selectedFlow.workflowName);
      for (i in statesArray){
        dynamicState = new state.State(statesArray[i], machine);
      }
      console.log("New Machine Loaded with Vertices: "+ machine.getDefaultRegion().vertices);
      console.log("New States Array Loaded with Vertices: "+ statesArray);
    }
    else console.log("No flow found");
  }, *///end loadworkflow
    'createState' : function(name, type){
      var state = require('state.js');
      state.setConsole(console);
      var newNode = new state.State(name, machine);
      if (type == 'Initial'){
        initial.to(newNode);
      }
      if (type =='Final'){
        newNode.to(terminal);
      }
    },//end createState
    'createTransition' : function(name, source, target){
      var state = require('state.js');
      state.setConsole(console);

    }//end createTransition
});//end methods
