var globalName = "";
var gitVar = '';
Template.viewWorkflow.events({
  // Reroute back to dashboard upon logo click
  'click .logo': function(e){
    e.preventDefault();
    Router.go("/dashboardPage");
  },

  // Refresh Button Event, same idea as load on render but as a backup to reload the workflow
  'click #loadButton': function(e){
    e.preventDefault();
    var email = Meteor.user().emails[0].address;
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

    // Beginning of data visualization for view workflow
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
      j++
    }

    // Definition of states to be viewed
    nodes = new vis.DataSet(NodesArray);

    // Transitions visualization
    var EdgesArray = [];
    for (i in codeEdgeArray) {
      var EdgeDoc = Transitions.findOne({_id: codeEdgeArray[i]});
      console.log("Transition name: " + EdgeDoc.name);
      var startKey, endKey;
      var keyOne = EdgeDoc.source;
      var keyTwo = EdgeDoc.target;
      var tranName = EdgeDoc.name;
      console.log("Transition source: "+ keyOne+ " target: " + keyTwo);
      var startDoc = StatesList.findOne({_id : EdgeDoc.source});
      var endDoc = StatesList.findOne({_id : EdgeDoc.target});
      startTran = startDoc._id;
      endTran = endDoc._id;
      for (k in NodesArray) {
        if (NodesArray[k].id == startTran) {
        console.log("Start Tran Match Found");
        startKey = NodesArray[k].id;
        }
        if (NodesArray[k].id == endTran) {
          console.log("End Tran Match Found");
          endKey = NodesArray[k].id;
        }
      }
      EdgesArray.push({
        from: startKey,
        to: endKey,
        color: {color: '#97C2FC'},
        arrows :'to',
        label: tranName
      });
    }

    // Definition of transitions to be viewed
    edges = new vis.DataSet(EdgesArray);

    var container = document.getElementById('mynetwork');

  // States and Transitions added to the data
    var data = {
      nodes: nodes,
      edges: edges
    };

    // Empty set of options
    // Can add options based on visJS docs 
    var options = {

    };

    // Initalization of Network using the container, data, and options
    var network = new vis.Network(container, data, options);

    // Set double click event on network to toggle a modal
    network.on("doubleClick", function(params) {
      params.event = "[original event]";
      var data = JSON.stringify(params, null, 4);
      var json = JSON.parse(data);
      console.log("node json: " + data);
      var key = String(json.nodes);
      console.log("node key: " + key);
      console.log("node key type : " + typeof key);
      var changeDoc = StatesList.findOne({_id: key});
      if (changeDoc != null) {
        globalName = changeDoc.name;
        editContainer = document.getElementById("editStateInput");
        editContainer.innerHTML = '';
        $('#editModal').modal('toggle');
        editContainer.innerHTML +=  '<input type="value" class="form-control text-center" id="stateNameField" placeholder="'+globalName+'"/>';
        console.log("Grabbed Old Name:" + globalName);
      } else {
        console.log("No Doc");
      }

    });

    titleContainer = document.getElementById("title");
    titleContainer.innerHTML = '';
    titleContainer.innerHTML += '<h2 id="titleName">'+wfName+' <i class="fa fa-cog fa-lg" id="gear" aria-hidden="true"></i></h2>';

    // Edit workflow name
    document.getElementById("gear").onclick = function() {
      editContainer = document.getElementById("editWFInput");
      editContainer.innerHTML = '';
      $('#editWFModal').modal('toggle');
      editContainer.innerHTML +=  '<input type="value" class="form-control text-center" id="wfNameField" placeholder="'+wfName+'"/>';
    }
  }, // end load button

  // Confirm Deletion Event
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
      // You must remove workflows by the id
      Workflows.remove({
        _id: deleteQuery._id
      });
      alert("Workflow by "+ deleteName + " Deleted");
    } else alert("No Workflow by "+ deleteName + " Found");
    document.getElementById("deleteForm").reset();
    //console.log(deleteName + ", has been deleted!");
    regional = machine.getDefaultRegion();
    deleteName = "";
    console.log(StatesList.find().fetch());
  }, // end confirmDelete

  // Close the edit modal that has been toggled
  'click .close': function (e){
    e.preventDefault();
    $("#nameField").remove();
  },

  // Advance in the workflow from the modal that's been toggled
  'click #continueWFButton': function (e){
    e.preventDefault();
    taskText = document.getElementById("taskDrop").value;
    console.log("Confimred Value: " + taskText);
    var wfDoc = Workflows.findOne({workflowName: wfName});

    if (wfDoc){
    // Update the current workflow based on task completion
    Workflows.update({_id: wfDoc._id},{
      $set:{
        currentState: Transitions.findOne({name: taskText}).target,
        completedTransitions: wfDoc.completedTransitions + Transitions.findOne({name: taskText})._id}},
      {upsert: false});
    }

    //Update The number of ties completed
    StatesList.update({_id: Transitions.findOne({name: taskText}).target},{$inc: {completedTimes: 1}},{upsert: false});

    // If the terminal state is reached, an alert is toggled
    if (StatesList.findOne({_id: Transitions.findOne({name: taskText}).target}).type == "Final"){
      alert("Terminal State Reached!! Please Alert your supervisor.");
    }
  }, // end continueWF

  // Bring up task advance modal
  'click #taskButton': function (e){
    e.preventDefault();
    var email = Meteor.user().emails[0].address;
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
    Meteor.call('notifcationSend',email, wfName);
  }, // end taskButton

  // Change the Workflow name
  'click #changeWFButton': function(e) {
    e.preventDefault();
    var name = document.getElementById('wfNameField').value;
    var wfDoc = Workflows.findOne({workflowName: wfName});
    if (wfDoc){
    Workflows.update({_id: wfDoc._id},{$set:{workflowName: name}},{upsert: false});}
    console.log("Changed Name: " + globalName + "To: " + name);
    $("#wfNameField").remove();
    wfName = name;
    titleContainer.innerHTML += '<h2 id="titleName">'+wfName+'<i class="fa fa-cog fa-lg" id="gear" aria-hidden="true"></i></h2>';
  }, // end changeWFButton

  // Change state name
  'click #changeButton': function(e) {
    e.preventDefault();
    var name = document.getElementById('stateNameField').value;
    var stateDoc = StatesList.findOne({name: globalName});
    if (stateDoc){
    StatesList.update({_id: stateDoc._id},{$set:{name: name}}, {upsert:false});}
    console.log("Changed Name: " + globalName + "To: " + name);
    $("#stateNameField").remove();
    document.getElementById("loadButton").click();
  },

  // Logout event in the upper corner
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
  var email = Meteor.user().emails[0].address;
  // $('#loadButton').click();
  nameContainer = document.getElementById("logout");
  nameContainer.innerHTML +=  '<p id="user">'+user+'</p>';
  console.log(user);
});

// Must use template rendered to automatically view the workflow without having to create a load button
Template.viewWorkflow.rendered = function() {
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

  // Beginning of data visualization for view workflow
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
    j++
  }

  // Definition of states to be viewed
  nodes = new vis.DataSet(NodesArray);

  // Transitions visualization
  var EdgesArray = [];
  for (i in codeEdgeArray) {
    var EdgeDoc = Transitions.findOne({_id: codeEdgeArray[i]});
    console.log("Transition name: " + EdgeDoc.name);
    var startKey, endKey;
    var keyOne = EdgeDoc.source;
    var keyTwo = EdgeDoc.target;
    var tranName = EdgeDoc.name;
    console.log("Transition source: "+ keyOne+ " target: " + keyTwo);
    var startDoc = StatesList.findOne({_id : EdgeDoc.source});
    var endDoc = StatesList.findOne({_id : EdgeDoc.target});
    startTran = startDoc._id;
    endTran = endDoc._id;
    for (k in NodesArray) {
      if (NodesArray[k].id == startTran) {
      console.log("Start Tran Match Found");
      startKey = NodesArray[k].id;
      }
      if (NodesArray[k].id == endTran) {
        console.log("End Tran Match Found");
        endKey = NodesArray[k].id;
      }
    }
    EdgesArray.push({
      from: startKey,
      to: endKey,
      color: {color: '#97C2FC'},
      arrows :'to',
      label: tranName
    });
  }

  // Definition of transitions to be viewed
  edges = new vis.DataSet(EdgesArray);

  var container = document.getElementById('mynetwork');

// States and Transitions added to the data
  var data = {
    nodes: nodes,
    edges: edges
  };

  // Empty set of options
  var options = {};

  // Initalization of Network using the container, data, and options
  var network = new vis.Network(container, data, options);

  // Set double click event on network to toggle a modal
  network.on("doubleClick", function(params) {
    params.event = "[original event]";
    var data = JSON.stringify(params, null, 4);
    var json = JSON.parse(data);
    console.log("node json: " + data);
    var key = String(json.nodes);
    console.log("node key: " + key);
    console.log("node key type : " + typeof key);
    var changeDoc = StatesList.findOne({_id: key});
    if (changeDoc != null) {
      globalName = changeDoc.name;
      editContainer = document.getElementById("editStateInput");
      editContainer.innerHTML = '';
      $('#editModal').modal('toggle');
      editContainer.innerHTML +=  '<input type="value" class="form-control text-center" id="stateNameField" placeholder="'+globalName+'"/>';
      console.log("Grabbed Old Name:" + globalName);
    } else {
      console.log("No Doc");
    }

  });

  titleContainer = document.getElementById("title");
  titleContainer.innerHTML = '';
  titleContainer.innerHTML += '<h2 id="titleName">'+wfName+' <i class="fa fa-cog fa-lg" id="gear" aria-hidden="true"></i></h2>';

  // Edit workflow name
  document.getElementById("gear").onclick = function() {
    editContainer = document.getElementById("editWFInput");
    editContainer.innerHTML = '';
    $('#editWFModal').modal('toggle');
    editContainer.innerHTML +=  '<input type="value" class="form-control text-center" id="wfNameField" placeholder="'+wfName+'"/>';
  }
} // end rendered
