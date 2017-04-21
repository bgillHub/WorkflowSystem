if (Meteor.isServer) {
  Meteor.startup(function () {
    // process.env.MAIL_URL = "smtp://postmaster%40<mattcucuzza@gmail.com>.mailgun.org:password@smtp.mailgun.org:587";
    process.env.MAIL_URL = "smtp://postmaster%40sandbox99d398c004f949b4be5dab3d89b65fe9.mailgun.org:password@smtp.mailgun.org:587"
    console.log("Meteor Started As Server in Main");
  });
}

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
'notifcationSend': function(user, wfName){
  Meteor.defer(function() {
    Email.send({
      to: user,
      from: "FlexFlow Administrator <admin@localhost.com>",
      subject: "FlexFlow: Task Completion Notification",
      text: "A task has been completed on the workflow " + wfName + ". Please visit FlexFlow and check on the progress of " + wfName + "."
    })
  });
  }
});
