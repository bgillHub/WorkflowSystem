// Main JS file required by Meteor

if (Meteor.isClient) {
  console.log("Meteor Started As Client in Main");
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log("Meteor Started As Server in Main");
  });
}
