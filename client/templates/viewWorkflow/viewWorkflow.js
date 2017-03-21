Template.viewWorkflow.onRendered( function () {
  // create an array with nodes
  var j = 0;
  StatesArray = StatesList.find().fetch();
  console.log(StatesArray);

  var NodesArray = [];
  for (i in StatesArray) {
    name = StatesArray[i].name;
    NodesArray.push({id: j, label: name});
    j++
  }

  nodes = new vis.DataSet(NodesArray);

  // edges attach by ID's

  // create an array with edges
  // var edges = new vis.DataSet([
  //     {from: 1, to: 3},
  //     {from: 1, to: 2},
  //     {from: 2, to: 4},
  //     {from: 2, to: 5}
  // ]);

  // create a network
  var container = document.getElementById('mynetwork');

  // provide the data in the vis format
  var data = {
      nodes: nodes
      // edges: edges
  };
  var options = {};

  // initialize your network!
  var network = new vis.Network(container, data, options);
    // nodeIds.push(id);
});
