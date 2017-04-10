var globalName = "";
var gitVar = '';
Template.viewWorkflow.events({
  'click .logo': function(e){
    e.preventDefault();
    Router.go("/dashboardPage");
  },
  'click #loadButton': function(e){
    e.preventDefault();
    var j = 1;
    var codeArray = Workflows.findOne({workflowName: wfName}).States;
    var codeEdgeArray = Workflows.findOne({workflowName: wfName}).Transitions;
    var titleArray = [];
    for (i in codeArray){
      titleArray.push(StatesList.findOne({_id: codeArray[i]}));
    }
    StatesArray = titleArray;
    console.log("WF Title: " + wfName);
    console.log("States: " + StatesArray);
    console.log("Edges: " + codeEdgeArray);
    var NodesArray = [];
    for (i in StatesArray) {
      name = StatesArray[i].name;
      key = StatesArray[i]._id;
      console.log("Pushing with States: " + key);
      type = StatesArray[i].type;
      curKey = Workflows.findOne({workflowName: wfName}).currentState;
      if (key == curKey){
        NodesArray.push({
          id: key,
          label: name,
          color:{
            background: '#ffff00',
            border: '#ffff00',
            highlight:{
              background: '#ffff00',
              border: '#ffff00'
            }
          }
        });
      }
      else if (type == 'Initial') {
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
      //name = StatesArray[i];
      //key = j;
      //NodesArray.push({id: key, label: name});
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
    var startDoc = StatesList.findOne({_id : EdgeDoc.source});
    var endDoc = StatesList.findOne({_id : EdgeDoc.target});
    startTran = startDoc.name;
    endTran = endDoc.name;
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
      $('#editModal').modal('toggle');
      editContainer = document.getElementById("editStateInput");
      editContainer.innerHTML +=  '<input type="value" class="form-control text-center" id="stateNameField" placeholder="'+name+'"/>';
      globalName = name;
      console.log("Grabbed Old Name:" + globalName);
      // document.getElementById('stateNameField').innerHTML = name;
    }
    });
    titleContainer = document.getElementById("title");
    titleContainer.innerHTML += '<h2 id="titleName">'+wfName+'<i class="fa fa-cog fa-lg" id="gear" aria-hidden="true"></i></h2>';

  /*document.getElementById("loadButton").onclick = function() {
    this.disabled = true;
  }*/

    document.getElementById("gear").onclick = function() {
      $('#editWFModal').modal('toggle');
      editContainer = document.getElementById("editWFInput");
      editContainer.innerHTML +=  '<input type="value" class="form-control text-center" id="wfNameField" placeholder="'+wfName+'"/>';
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
  'click #confirmDelete': function(e) {
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
    var deleteQuery = Workflows.findOne({ workflowName: deleteName});
    if (deleteQuery){
      Workflows.remove({
        _id: deleteQuery._id
      });
      alert("Workflow by "+ deleteName + " Deleted");
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
  'click #continueWFButton': function (e){
    e.preventDefault();
    taskText = document.getElementById("taskDrop").value;
    console.log("Confimred Value: " + taskText);
    var wfDoc = Workflows.findOne({workflowName: wfName});
    if (wfDoc){
    Workflows.update({_id: wfDoc._id},{
      $set:{
        currentState: Transitions.findOne({name: taskText}).target,
        completedTransitions: wfDoc.completedTransitions + Transitions.findOne({name: taskText})._id}},
      {upsert: false});
    }
    if (StatesList.findOne({_id: Transitions.findOne({name: taskText}).target}).type == "Final"){
      alert("Terminal State Reached!! Please Alert your supervisor.");
    }
  },
  'click #taskButton': function (e){
    e.preventDefault();
    TransCursor = Transitions.find().fetch();
    currState = Workflows.findOne({workflowName: wfName}).currentState;
    console.log("currState : "+ currState);
    taskContainer = document.getElementById("taskDrop");
    taskContainer.innerHTML = null;
    // var add = document.createDocumentFragment();
    var a = 0;
    for (i in TransCursor) {
      if (currState == TransCursor[i].source) {
        console.log("currState matched : "+ currState +" = " + TransCursor[i].source);
      name = TransCursor[i].name;
      taskContainer.innerHTML +=  '<option>'+ name +'</option>';
      a++
    }
    }
  },
  'click #changeWFButton': function(e) {
    e.preventDefault();
    var name = document.getElementById('wfNameField').value;
    var wfDoc = Workflows.findOne({workflowName: wfName});
    if (wfDoc){
    Workflows.update({_id: wfDoc._id},{$set:{workflowName: name}},{upsert: false});}
    console.log("Changed Name: " + globalName + "To: " + name);
    /*for (i in NodesArray) {
      var key = 0;
      console.log("json: " + json);
      if (name = NodesArray[i].label) {
        key = NodesArray[i].id;
        nodes.update([{id: key, label: name}]);
      }
    }*/
    $("#wfNameField").remove();
    wfName = name;
    titleContainer.innerHTML += '<h2 id="titleName">'+wfName+'<i class="fa fa-cog fa-lg" id="gear" aria-hidden="true"></i></h2>';
  },
  'click #changeButton': function(e) {
    e.preventDefault();
    var name = document.getElementById('stateNameField').value;
    var stateDoc = StatesList.findOne({name: globalName});
    if (stateDoc){
    StatesList.update({_id: stateDoc._id},{$set:{name: name}});}
    console.log("Changed Name: " + globalName + "To: " + name);
    /*for (i in NodesArray) {
      var key = 0;
      console.log("json: " + json);
      if (name = NodesArray[i].label) {
        key = NodesArray[i].id;
        nodes.update([{id: key, label: name}]);
      }
      console.log("States AFTER: " + regional.vertices);
    }*/
    $("#stateNameField").remove();
    document.getElementById("loadButton").click();
  },
  'click .logoutLink': function(e) {
    e.preventDefault();
    Meteor.logout();
    Router.go("/loginPage");
  }
});


$(document).ready(function(){
  $("#titleName").dblclick(function(){
      alert("Title double clicked");
  });
});

Template.viewWorkflow.onRendered( function () {
  var user = Meteor.user().profile.name;

  nameContainer = document.getElementById("logout");
  nameContainer.innerHTML +=  '<p id="user">'+user+'</p>';
  console.log(user);
});
