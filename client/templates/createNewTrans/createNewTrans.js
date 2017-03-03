Template.createTrans.events({
  'click #createButton': function(e) {
    e.preventDefault();
    console.log("You pressed the create button");
    var name = document.getElementById("nameField").value;
    var start = document.getElementById("startSelect").value;
    var end = document.getElementById("endSelect").value;
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
    console.log(name);
  },
  'click #clearButton': function(e) {
    e.preventDefault();
    console.log("You pressed the clear button");
    name = "";
  },
  'click #viewButton': function(e){
    e.preventDefault();
    console.log("You pressed the view transitions button");
    console.log(Transitions.find().fetch());
  },
  'click #cancelButton': function(e){
    e.preventDefault();
    console.log("You pressed the back button");
    Router.go("/");
  },
});
