Template.viewWorkflow.events({
  'click .logo': function(e){
    e.preventDefault();
    Router.go("/");
  },
  'click #loadButton': function(e){
    e.preventDefault();
    var j = 0;
    StatesArray = StatesList.find().fetch();
    TransArray = Transitions.find().fetch();
    console.log(StatesArray);
    console.log(TransArray);

    var NodesArray = [];
    for (i in StatesArray) {
      name = StatesArray[i].name;
      key = StatesArray[i]._id;
      NodesArray.push({id: key, label: name});
      j++
    }

    nodes = new vis.DataSet(NodesArray);

    // edges attach by ID's

    var EdgesArray = [];
    for (i in TransArray) {
      var startKey, endKey;
      startTran = TransArray[i].startState;
      endTran = TransArray[i].endState;
      for (k in StatesArray) {
        if (StatesArray[k].name == startTran) {
          console.log("Start Tran Match Found");
          startKey = StatesArray[k]._id;
        }
        if (StatesArray[k].name == endTran) {
          console.log("End Tran Match Found");
          endKey = StatesArray[k]._id;
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
