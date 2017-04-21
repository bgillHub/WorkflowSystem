if (Meteor.isClient) {
  //var state = require('state.js');
  console.log("Meteor Started As Client in Main");
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // process.env.MAIL_URL = "smtp://postmaster%40<mattcucuzza@gmail.com>.mailgun.org:password@smtp.mailgun.org:587";
    // process.env.MAIL_URL = "smtp://postmaster%40sandbox99d398c004f949b4be5dab3d89b65fe9.mailgun.org:truffle@smtp.mailgun.org:587"
    console.log("Meteor Started As Server in Main");
  });

  // Meteor.methods({
  //   'notifcationSend': function(e){
  //     Meteor.defer(function() {
  //       Email.send({
  //         to: "User <mattcucuzza@gmail.com>",
  //         from: "FlexFlow Admin <admin@localhost.com>",
  //         subject: "Sending Email with Meteor is Easy!",
  //         text: "This is the text in the body of our email."
  //       })
  //     });
  //   }
  // });
}
