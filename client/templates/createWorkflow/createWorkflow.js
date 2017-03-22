Template.createWorkflow.events({
  'click #createButton': function(e) {
    e.preventDefault();
    var name = document.getElementById("nameField").value;
    wfName = name;
    Workflows.insert({
      workflowName: wfName,
      States: [],
      Transitions: []
    });
    WorkflowsList.insert({
      name: name
    });
    Meteor.call('createMachine', name);
    Router.go("/createState");
  },
  'click #clearButton': function(e) {
    e.preventDefault();
    document.getElementById("createForm").reset();
    name = "";
  },
  'click #cancelButton': function(e) {
    e.preventDefault();
    Meteor.call('saveWorkflow');
    Router.go("/");
  },
  'click .logo': function(e){
    e.preventDefault();
    Router.go("/");
  }
});
