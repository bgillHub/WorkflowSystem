if (Meteor.isClient) {
  Meteor.startup(function () {
    var state = require('state.js');
    state.setConsole(console);
    model = new state.StateMachine("model");
    console.log("Meteor Executed Client Code. Created StateMachine");
    console.log("Meteor started as Client with Browserify");
  });//end startup
}// if is client
if (Meteor.isServer) {
  Meteor.methods({
    'saveWorkflow': function (Name){
      var state = require('state.js');
      state.setConsole(console);
      var initial = new state.PseudoState("initial", model, state.PseudoStateKind.Initial);
      var stateNew = new state.State(Name, model);
      initial.to(stateNew);
      var instance = new state.StateMachineInstance("progress");
      state.initialise(model, instance);
      var jsonObject = new state.JSONInstance("henry");
      state.initialise(model, jsonObject);
      jsonString = jsonObject.toJSON();
      if (jsonString){
        console.log("Created Json Passer");
      }
      else {console.log("JSON instance found empty");}
      console.log("State Created on Client Method: " + stateNew.name);
      console.log(StatesList.find().fetch());
      console.log("Workflow Name: " + StatesList.findOne().workflowName);
      console.log("State Inserted On Client Method");
    }//end create state
  });//end methods

}//end is server
Meteor.methods({
  'saveWorkflow': function (Name){
    var state = require('state.js');
    state.setConsole(console);
    var initial = new state.PseudoState("initial", model, state.PseudoStateKind.Initial);
    var stateNew = new state.State(Name, model);
    initial.to(stateNew);
    var instance = new state.StateMachineInstance("progress");
    state.initialise(model, instance);
    var jsonObject = new state.JSONInstance("jsonInstane");
    state.initialise(model, jsonObject);
    jsonString = jsonObject.toJSON();
    if (jsonString){
      console.log("Created Json Passer");
    }
    else {console.log("JSON instance found empty");}
    console.log("State Created on Client Method: " + stateNew.name);
  }//end create state
});//end methods
