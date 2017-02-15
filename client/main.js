if (Meteor.isClient) {
  //var state = require('state.js');
  console.log("Meteor Started As Client in Main");
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.methods({

    });//end methods
    console.log("Meteor Started As Server in Main");
  });
}
