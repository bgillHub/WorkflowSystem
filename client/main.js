//import '../imports/lib/methods.js';
//import '../imports/startup/accounts-config.js';
//import '../imports/startup/client/routes.js';

if (Meteor.isClient) {
  //StatesList = new Mongo.Collection('states');
  Template.body.events({
    'click #createButton': function(e) {
      e.preventDefault();
      console.log("You pressed the create button");
      var name = document.getElementById("nameField").value;
      //const pred = document.getElementById("loopTaskField").value;
      var loopTask = document.getElementById("loopTaskField").value;
      var next = document.getElementById("nextStateField").value;
      //const type = document.getElementById("stateTypeField").value;
      StatesList.insert({
        name: name,
        loopTask: loopTask,
        nextState: next
      });
      console.log(name + ","  + loopTask + "," + next);
    }, // end createButton
    'click #clearButton': function(e){
      e.preventDefault();
      console.log("You pressed the clear button");
      document.getElementById("createForm").reset();
      name = "";
    },
    'click #viewButton': function(e) {
      e.preventDefault();
      console.log("You pressed the view button");
      console.log(StatesList.find().fetch());
    }
    });


} // end client

if (Meteor.isServer) {

} // end server
