if (Meteor.isServer) {
  Meteor.startup(function () {
    // This MailGun URL is needed by Meteor's Email package to authorize emails
    // Authoirze application on mailgun if using a new account and change the username and password in this String and authorize any emails added
    // Username: postmaster@sandbox99d398c004f949b4be5dab3d89b65fe9.mailgun.org
    // Password: password
    process.env.MAIL_URL = "smtp://postmaster%40sandbox99d398c004f949b4be5dab3d89b65fe9.mailgun.org:password@smtp.mailgun.org:587"
    console.log("Meteor Started As Server in MiscMethods");
    Meteor.publish("allUsers", function () {
      console.log("Meteor Published User Emails in MISC");
      return Meteor.users.find({},{
     // specific fields to return
        'profile.email': 1,
        'profile.name': 1,
        'profile.createdAt': 1
      });
    });
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
