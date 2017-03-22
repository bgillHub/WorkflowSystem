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
      type = StatesArray[i].type;
      if (type == 'Initial') {
        NodesArray.push({
          id: key,
          label: name,
          color:{
            background: '#32CD32',
            border: '#32CD32',
            highlight:{
              background: '#32CD32',
              border: '#32CD32'
            }
          }
        });
      } else if (type == "Final") {
        NodesArray.push({
          id: key,
          label: name,
          color:{
            background: '#E06666',
            border: '#E06666',
            highlight:{
              background: '#E06666',
              border: '#E06666'
            }
          }
        });
      } else NodesArray.push({
        id: key,
        label: name,
        color: {
          background: '#97C2FC',
          border:'#97C2FC',
          highlight: {
            background: '#97C2FC',
            border: '#97C2FC'
          }
        }
      });
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
