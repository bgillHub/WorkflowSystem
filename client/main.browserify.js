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

    // Creates an initial machine
    'createMachine': function(name){
      var state = require('state.js');
      wfName = name;
      statesArray = [];
      state.setConsole(console);
      machine = new state.StateMachine(name);
      // Creation of the initial state
      initial = new state.PseudoState("initial", machine, state.PseudoStateKind.Initial);
      // Creation of the final state
      terminal = new state.PseudoState("terminal", machine, state.PseudoStateKind.Terminate);
      initial.to(terminal);
      var instance = new state.StateMachineInstance(name);
      state.initialise(machine, instance);
      alert("Machine Created and Initialsed");
    },

    // Method to save a workflow
    'saveWorkflow': function (Name){
      var state = require('state.js');
      state.setConsole(console);
      let verticesArray = machine.getDefaultRegion().vertices;
      console.log("Vertices from default region: " + verticesArray);
      console.log("States from current array: " + statesArray);
    }, //end  saveWorkflow

    // Add a state to the workflow
    'addState': function (Name, Type){
      var state = require('state.js');
      state.setConsole(console);
      newState = new state.State(Name, machine);
      statesArray.push(Name);
      // Insert into the MongoDB a name & type
      StatesList.insert({
        stateName: Name,
        stateType: Type
      });
      var instance = new state.StateMachineInstance("progress");
      //state.initialise(machine, instance);
      console.log("Current Array: " + statesArray);
    },//end addState

    // Load states method... finds the names through querying the db
    'loadStates' : function(){
      var deleteQuery = StatesList.findOne({ name: deleteName});
    },

    // Load an entire workflow
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
    },//end  saveWorkflow
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

      console.log('Workflow Loaded');
    }//end iff wfDoc
    else console.log('No workflow found...');
  },//end loadWorkflow
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
