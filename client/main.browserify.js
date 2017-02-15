if (Meteor.isClient) {
  var state = require('state.js');
  var model = new state.StateMachine("model");
  var initial = new state.PseudoState("initial", model, state.PseudoStateKind.Initial);
  var stateA = new state.State("stateOne", model);
  var stateB = new state.State("stateTwo", model);
  console.log("HI CLIENT BRIAN!!!! We made states " + stateA.name + ", " + stateB.name);
  Meteor.startup(function () {
    Meteor.methods({
      createState: function (){
        var state = require('state.js');
        var model = new state.StateMachine("model");
        var initial = new state.PseudoState("initial", model, state.PseudoStateKind.Initial);
        var stateC = new state.State("stateOld", model);
        var stateD = new state.State("stateNew", model);
        console.log("States Created: " + stateC.name + ", " + stateD.name);
      }//end create state
    });//end methods
    console.log("HI BRIAN");
  });//end startup
}// if is client
if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.methods({
      createState: function (){
        var state = require('state.js');
        var model = new state.StateMachine("model");
        var initial = new state.PseudoState("initial", model, state.PseudoStateKind.Initial);
        var stateA = new state.State("stateOld", model);
        var stateB = new state.State("stateNew", model);
        console.log("State Created");
      }//end create state
    });//end methods
    console.log("HI BRIAN");
  });
}
