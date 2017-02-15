if (Meteor.isClient) {
  var state = require('state.js');
  var model = new state.StateMachine("model");
  var initial = new state.PseudoState("initial", model, state.PseudoStateKind.Initial);
  var stateA = new state.State("stateA", model);
  var stateB = new state.State("stateB", model);
  console.log("HI CLIENT BRIAN!!!! We made states");
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.methods({
      createState: function (){
        var state = require('state.js');
        var model = new state.StateMachine("model");
        var initial = new state.PseudoState("initial", model, state.PseudoStateKind.Initial);
        var stateA = new state.State("stateA", model);
        var stateB = new state.State("stateB", model);
        console.log("State Created");
      }//end create state
    });//end methods
    console.log("HI BRIAN");
  });
}
