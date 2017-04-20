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
},
// 'notifcationSend': function(e){
//   Meteor.defer(function() {
//     Email.send({
//       to: "User <mattcucuzza@gmail.com>",
//       from: "FlexFlow Admin <admin@localhost.com>",
//       subject: "Sending Email with Meteor is Easy!",
//       text: "This is the text in the body of our email."
//     })
//   });
//   }
});
