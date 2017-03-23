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
      name = StatesArray[i].name;
      key = StatesArray[i]._id;
      type = StatesArray[i].type;
      // if (type == 'Initial') {
      //   NodesArray.push({
      //     id: key,
      //     label: name,
      //     color:{
      //       background: '#32CD32',
      //       border: '#32CD32',
      //       highlight:{
      //         background: '#32CD32',
      //         border: '#32CD32'
      //       }
      //     }
      //   });
      // } else if (type == "Final") {
      //   NodesArray.push({
      //     id: key,
      //     label: name,
      //     color:{
      //       background: '#E06666',
      //       border: '#E06666',
      //       highlight:{
      //         background: '#E06666',
      //         border: '#E06666'
      //       }
      //     }
      //   });
      // } else NodesArray.push({
      //   id: key,
      //   label: name,
      //   color: {
      //     background: '#97C2FC',
      //     border:'#97C2FC',
      //     highlight: {
      //       background: '#97C2FC',
      //       border: '#97C2FC'
      //     }
      //   }
      // });
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
      EdgesArray.push({
        from: startKey,
        to: endKey,
        color: {color: '#97C2FC'},
        arrows :'to'
      });
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
