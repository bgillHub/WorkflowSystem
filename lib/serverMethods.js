/*Meteor.methods({
  'createState': function (Name){
    var state = require('state.js');
    state.setConsole(console);
    var initial = new state.PseudoState("initial", model, state.PseudoStateKind.Initial);
    var stateNew = new state.State(Name, model);
    initial.to(stateNew);
    var instance = new state.StateMachineInstance("progress");
    state.initialise(model, instance);
    var jsonObject = new state.JSONInstance("henry");
    state.initialise(model, jsonObject);
    let jsonString = jsonObject.toJSON();
    console.log("State Created on Client Method: " + stateNew.name);
    StatesList.insert({
      stateName: Name,
      stateJson: jsonString
    });
    console.log("State Inserted On Client Method");
  }//end create state
});//end methods*/
