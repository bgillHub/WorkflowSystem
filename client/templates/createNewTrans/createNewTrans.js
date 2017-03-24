Template.createTrans.events({
  'click #createButton': function(e) {
    e.preventDefault();
    console.log("You pressed the create button");
    var name = document.getElementById("nameField").value;
    var start = document.getElementById("startDrop").value;
    var end = document.getElementById("endDrop").value;
    var source;
    var target;
    //wfName = machine.qualifiedName;
    for (i in machine.getDefaultRegion().vertices){
      if (i.qualifiedName == start) i = source;
      if (i.qualifiedName == end) i = target;
    }
    var insertedTrans = {name: name, source: start, target:end};
    Transitions.insert(insertedTrans, function(err, reference){
      if (err) return;
      // Object inserted successfully.
      var newid = Transitions.findOne({name: name})._id; // this will return the id of object inserted
      var newArray = wfDoc.Transitions;
      newArray.push(newid);
      Workflows.update({_id: wfDoc._id}, {$set: {Transitions: newArray}});
      console.log("Transitions Updated, Object ID: " + newid);
      Meteor.call('createTransition', start, end);
    });//end callback

    /*
    Meteor.call('createTransition', source, target);
    console.log("Workflow name: " + wfName);
    var foundObject = Workflows.findOne({workflowName:wfName});
    //Meteor.call('updateTransitions');
    Workflows.update(
   {_id: Workflows.findOne({workflowName:wfName})._id},
   {
     workflowName: wfName,
     States: statesArray,
     Transitions:{
       name: name,
       startState: start,
       endState: end
     }
   },
    {upsert: true}
  );
  Transitions.insert({
    name: name,
    startState: start,
    endState: end
  });*/
    console.log(name);
  },//end create  button
  'click #clearButton': function(e) {
    e.preventDefault();
    console.log("You pressed the clear button");
    name = "";
  },
  'click #viewButton': function(e){
    e.preventDefault();
    console.log("You pressed the view transitions button");
    console.log(Transitions.find().fetch());
    Router.go("/viewWorkflow");
  },
  'click #cancelButton': function(e){
    e.preventDefault();
    console.log("You pressed the back button");
    //Meteor.call('saveWorkflow');
    Router.go("/");
  },
  'click .logo': function(e){
    e.preventDefault();
    Router.go("/");
  }
}),

Template.createTrans.onRendered( function () {
  console.log('rendered');
  StatesArray = machine.getDefaultRegion().vertices;
  //WFArray.push(WorkflowsList.find().fetch());
  console.log("Array " + StatesArray);
  startContainer = document.getElementById("startDrop");
  endContainer = document.getElementById("endDrop");
  child = document.getElementById("state");
  // var add = document.createDocumentFragment();
  var a = 0;
  for (i in StatesArray) {
    name = StatesArray[i].name;
    if (name != 'initial' && name != 'terminal'){
    startContainer.innerHTML +=  '<option>'+ name +'</option>';
    endContainer.innerHTML +=  '<option>'+ name +'</option>';}
    a++
  }
});
