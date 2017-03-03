Meteor.methods({
  'updateTransitions': function(){
    Workflows.update(
   {workflowName: wfName},
   {
     workflowName: wfName,
     States: statesArray,
     Transitions:{
       name: 'name',
       startState: 'start',
       endState: 'end'
     }
},
    {upsert: true}
  );
  }
});
