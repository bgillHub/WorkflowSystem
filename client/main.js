// Main JS file required by Meteor

if (Meteor.isClient) {
  console.log("Meteor Started As Client in Main.js");
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log("Meteor Started As Server in Main.js");
    Meteor.publish("allUsers", function () {
      return Meteor.users.find({});
    });
    console.log("Meteor Published User Emails");
  });
}
