/*'createState' : function(name, type){
  var state = require('state.js');
  state.setConsole(console);
  var insertedState = {name: name, type: type};
  StatesList.insert(insertedState);
  var id = insertedState._id;
  var newArray = wfDoc.States + id;
  Workflows.update({workflowName: wfName}, {States: newArray});
  console.log("StatesList Updated, Object ID: " + id);
}//end createState
'createTransition' : function(name, source, target){
  var state = require('state.js');
  state.setConsole(console);
  var insertedTrans = {name: name, source: source, target:target};
  n =Transitions.insert(insertedTrans);
  var id = insertedTrans._id;
  var newArray = wfDoc.Transitions + id;
  Workflows.update({workflowName: wfName}, {Transitions: newArray});
  console.log("Transitions Updated, Object ID: " + id);
}

'loadWorkflow' : function(name){
  var state = require('state.js');
  state.setConsole(console);
  wfDoc = Workflows.findOne(workflowName: name);
  if (wfDoc != null){
    wfName = name;
    machine = new state.StateMachine(wfDoc.workflowName);
    initial = new state.PseudoState("initial", machine, state.PseudoStateKind.Initial);
    terminal = new state.PseudoState("terminal", machine, state.PseudoStateKind.Terminate);
    var nodeArray = wfDoc.States;
    for (i in nodeArray){
      var q = StatesList.findOne({_id: i});
      var z =new state.State(q.name, machine);
      if (q.type == 'intial'){
        intial.to(z);
      }
      if (q.type == 'terminal'){
        terminal.to(z);
      }
    }//end for
    var tranArray = wfDoc.Transitions;
    for (i in tranArray){
      var tranDoc = Transitions.findOne({_id: i});
      var first = StatesList.findOne({_id: tranDoc.source});
      var second = StatesList.findOne({_id: tranDoc.target});
      var firstNode = new state.State('blank', machine);
      var secondNode = new state.State('blank', machine);
      nodes = machine.getDefaultRegion().vertices;
      for (i in nodes){
        if (i.qualifiedName == first.name) {
          firstNode = i;
        }
        if (i.qualifiedName == second.name){
          secondNode = i;
        }
      }//end each node check
      firstNode.to(secondNode);
      console.log('Transition processed');
    }// end each transition
    console.log('Workflow Loaded');
  }//end iff wfDoc
  else console.log('No workflow found...');
}

*/
/*
Change worklow name
Workflows.update({_id: workflowId},{$set{name: input}},{upsert =  false});

*/
