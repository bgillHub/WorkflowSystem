if (Meteor.isServer) {
  Meteor.startup(function () {
    // This MailGun URL is needed by Meteor's Email package to authorize emails
    process.env.MAIL_URL = "smtp://postmaster%40sandbox99d398c004f949b4be5dab3d89b65fe9.mailgun.org:password@smtp.mailgun.org:587"
    console.log("Meteor Started As Server in Main");
  });
}

Meteor.methods({
  // Meteor method that updates transitions in the workflow
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

// Method to send notifications that will be called in the viewWorkflow js
'notifcationSend': function(user, wfName){
  // Email must be wrapped in a defer block otherwise it won't work 
  Meteor.defer(function() {
    // Email composition that will be sent to the users
    Email.send({
      to: user,
      from: "FlexFlow Administrator <admin@localhost.com>",
      subject: "FlexFlow: Task Completion Notification",
      text: "A task has been completed on the workflow " + wfName + ". Please visit FlexFlow and check on the progress of " + wfName + "."
    })
  });
  }
});
