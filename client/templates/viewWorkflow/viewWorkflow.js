Template.viewWorkflow.events({
  'click .logo': function(e){
    e.preventDefault();
    Router.go("/");
  },
  'click #loadButton': function(e){
    e.preventDefault();
    var j = 0;
    var codeArray = Workflows.findOne({workflowName: wfName}).States;
    var codeEdgeArray = Workflows.findOne({workflowName: wfName}).Transitions;
    var titleArray = [];
    for (i in codeArray){
      titleArray.push(StatesList.findOne({_id: codeArray[i]}).name);
    }
    StatesArray = titleArray;
    console.log("States " + StatesArray);
    console.log("Edges " + codeEdgeArray);

    var NodesArray = [];
    for (i in StatesArray) {
      name = StatesArray[i];
      key = j;
      NodesArray.push({id: key, label: name});
      j++
    }

    nodes = new vis.DataSet(NodesArray);

    // edges attach by ID's

    var EdgesArray = [];
    for (i in codeEdgeArray) {
      var EdgeDoc = Transitions.findOne({_id: codeEdgeArray[i]});
      console.log("Transition name: " + EdgeDoc.name);
      var startKey, endKey;
      var keyOne = EdgeDoc.source;
      var keyTwo = EdgeDoc.target;
      console.log("Transition source: "+ keyOne+ " target: " + keyTwo);
      var startDoc = StatesList.findOne({name : EdgeDoc.source});
      var endDoc = StatesList.findOne({name : EdgeDoc.target});
      startTran = keyOne;
      endTran = keyTwo;
      for (k in NodesArray) {
        if (NodesArray[k].label == startTran) {
          console.log("Start Tran Match Found");
          startKey = NodesArray[k].id;
        }
        if (NodesArray[k].label == endTran) {
          console.log("End Tran Match Found");
          endKey = NodesArray[k].id;
        }
      }
      EdgesArray.push({from: startKey, to: endKey});
    }
    edges = new vis.DataSet(EdgesArray);


    // create a network
    var container = document.getElementById('mynetwork');

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {};

    // initialize your network!
    var network = new vis.Network(container, data, options);
      // nodeIds.push(id);
  }
});


Template.viewWorkflow.onRendered( function () {
  // create an array with nodes
  // var j = 0;
  // StatesArray = StatesList.find().fetch();
  // EdgesArray = Transitions.find().fetch();
  // console.log(StatesArray);
  // console.log(EdgesArray);
  //
  // var NodesArray = [];
  // for (i in StatesArray) {
  //   name = StatesArray[i].name;
  //   NodesArray.push({id: j, label: name});
  //   j++
  // }
  //
  // nodes = new vis.DataSet(NodesArray);
  //
  // // edges attach by ID's
  //
  // var EdgesArray = [];
  // EdgesArray.push({from: 0, to: 1});
  //
  // // for (i in Transitions) {
  // //   transition = Transitions[i].name;
  // //   startTran = Transitions[i].startState;
  // //   endTran = Transitions[i].endState;
  // //   EdgesArray.push({from: j, to: j+1});
  // // }
  //
  // edges = new vis.DataSet(EdgesArray);
  //
  // // create an array with edges
  // // var edges = new vis.DataSet([
  // //     {from: 1, to: 3},
  // //     {from: 1, to: 2},
  // //     {from: 2, to: 4},
  // //     {from: 2, to: 5}
  // // ]);
  //
  // // create a network
  // var container = document.getElementById('mynetwork');
  //
  // // provide the data in the vis format
  // var data = {
  //     nodes: nodes,
  //     edges: edges
  // };
  // var options = {};
  //
  // // initialize your network!
  // var network = new vis.Network(container, data, options);
  //   // nodeIds.push(id);
});
