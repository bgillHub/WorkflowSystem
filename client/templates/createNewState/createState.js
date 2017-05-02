Template.createState.events({
  'click #createButton': function(e) {
    e.preventDefault();
    var name = document.getElementById("nameField").value;
    var stateTime = document.getElementById("stateTime").value;
    console.log("TIME : " + stateTime)
    if (document.getElementById("initialRadio").checked) {
      var stateType = "Initial";
    } else if (document.getElementById("normalRadio").checked) {
      var stateType = "Normal";
    } else if (document.getElementById("finalRadio").checked) {
      var stateType = "Final";
    }

    // Finds the workflow name
    wfDoc = Workflows.findOne({workflowName: wfName});

    // Grabs the state name and the type
    var insertedState = {name: name, type: stateType};
    StatesList.insert(insertedState, function(err, reference){
      if (err) {console.log("Error: " + err); return;}
      else {
        console.log("Object inserted!");
        console.log("Attempt One: " + reference[0]._id);
        console.log("Attempt Two: " + insertedState._id);
        console.log("Attempt Three: " + StatesList.findOne({name: name})._id);
         var newid = StatesList.findOne({name: name})._id // this will return the id of object inserted
         var newArray = wfDoc.States;
         newArray.push(newid);

         // Updates the workflow with the newly created state
         Workflows.update({_id: wfDoc._id}, {$set: {States: newArray}});
         if (document.getElementById("initialRadio").checked) {
           // Sets the state type in the workflow
           Workflows.update({_id: wfDoc._id}, {$set: {currentState: newid}});
         }
         console.log("StatesList Updated, Object ID: " + newid);
         Meteor.call('createState', name, stateType);
       }
      // Object inserted successfully.
      document.getElementById("createForm").reset();
      name = "";
      stateType = "";
      stateTime = "";
      alert("State " + name + "created.");
    });//end callback
  }, // end createButton
  'click #clearButton': function(e){
    e.preventDefault();
    document.getElementById("createForm").reset();
    name = "";
    stateType = "";
    stateTime = "";
  }, // end clearButton
  'click #viewButton': function(e) {
    e.preventDefault();
    Meteor.call('saveWorkflow');
    Router.go("/createTrans");
  },
  'click #cancelButton': function(e){
    e.preventDefault();
    Meteor.call('saveWorkflow');
    console.log("Updating Workflow");
    console.log("ALL WORKFLOW NAMES: " + Workflows.find({}).fetch());
    Router.go("/dashboardPage");
  }, // end cancelButton
  'click .logo': function(e){
    e.preventDefault();
    Router.go("/dashboardPage");
  },
  'click .logoutLink': function(e) {
    e.preventDefault();
    Meteor.logout();
    Router.go("/loginPage");
  }
});

Template.createState.onRendered( function () {
  var user = Meteor.user().profile.name;
  nameContainer = document.getElementById("logout");
  nameContainer.innerHTML +=  '<p id="user">'+user+'</p>';
  console.log(user);

});
