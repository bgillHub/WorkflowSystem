Template.viewWorkflow.events({
  'click .logo': function(e){
    e.preventDefault();
    Router.go("/");
  },
  'click #loadButton': function(e){
    e.preventDefault();
    var j = 1;
    var codeArray = Workflows.findOne({workflowName: wfName}).States;
    var codeEdgeArray = Workflows.findOne({workflowName: wfName}).Transitions;
    var titleArray = [];
    for (i in codeArray){
      titleArray.push(StatesList.findOne({_id: codeArray[i]}).name);
    }
    StatesArray = titleArray;
    console.log("WF Title: " + wfName);
    console.log("States: " + StatesArray);
    console.log("Edges: " + codeEdgeArray);

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

    network.on("doubleClick", function(params) {
      params.event = "[original event]";
      var data = JSON.stringify(params, null, 4);
      var json = JSON.parse(data);
      var key = json.nodes;
      var name = "";
      console.log("node key: " + key);
      for (i in NodesArray) {
        if (key == NodesArray[i].id) {
          name = NodesArray[i].label;
          break;
        }
      }
      $('#editModal').modal('toggle');
      editContainer = document.getElementById("editStateInput");
      editContainer.innerHTML +=  '<input type="value" class="form-control text-center" id="nameField" placeholder="'+name+'"/>';
      // document.getElementById('stateNameField').innerHTML = name;
    });
    titleContainer = document.getElementById("title");
    titleContainer.innerHTML += '<h2 id="titleName">'+wfName+'<i class="fa fa-cog fa-lg" id="gear" aria-hidden="true"></i></h2>';

    // document.getElementById("loadButton").onclick = function() {
    //   this.disabled = true;
    // }

    document.getElementById("gear").onclick = function() {
      $('#editModal').modal('toggle');
      editContainer = document.getElementById("editStateInput");
      editContainer.innerHTML +=  '<input type="value" class="form-control text-center" id="nameField" placeholder="'+wfName+'"/>';
    }
      // nodeIds.push(id);
  }, // end load button
  // 'click #editButton': function(e){
  //   document.getElementById('stateNameField').innerHTML = "state";
  //   if (machine != null){
  //     console.log("You pressed Edit Workflow button");
  //     // Router.go("/createState");
  //   } else alert('No Workflow Selected!');
  // }
  'click #deleteButton': function(e) {
    e.preventDefault();
    var debugRegions = machine.regions;
    var defRegion = machine.defaultRegion;
    if (defRegion){
    }
    else console.log("Default doesnt exist...");
    console.log("Regions: " + debugRegions);
    console.log("Region #: " + debugRegions.length);
    var debugVertices = debugRegions[0];
    var deleteName = document.getElementById("deleteField").value;
    var deleteQuery = WorkflowsList.findOne({ name: deleteName});
    if (deleteQuery){
      WorkflowsList.remove({
        _id: deleteQuery._id
      });
    } else alert("No Workflow by "+ deleteName + " Found");
    document.getElementById("deleteForm").reset();
    //console.log(deleteName + ", has been deleted!");
    regional = machine.getDefaultRegion();
    /*if (regional!= null){
      var stateList = regional.vertices;
      for (i in statesArray){
          if (deleteName = i){
            let index = statesArray.indexOf(i);
            statesArray.splice(index, 1);
            console.log(deleteName + ", has been deleted from array!");
            console.log("Array:" + statesArray);
          }
        }
        console.log("States AFTER: " + regional.vertices);
      }*/
    //end if exists
    deleteName = "";
    console.log(StatesList.find().fetch());
    // Router.go("/createState");
  },
  'click .close': function (e){
    e.preventDefault();
    $("#nameField").remove();
  },
  'click #changeButton': function(e) {
    e.preventDefault();
  }
});
