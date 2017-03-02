Template.createWorkflow.events({
  'click #createButton': function(e) {
    e.preventDefault();
    console.log("You pressed the create button");
    var name = document.getElementById("nameField").value;
    Transitions.insert({
      name: name
    });
    console.log("Created Workflow: " + name);
  },
  'click #clearButton': function(e) {
    e.preventDefault();
    document.getElementById("createForm").reset();
    console.log("You pressed the clear button");
    name = "";
  },
  'click #backButton': function(e) {
    e.preventDefault();
    console.log("You pressed the back button");
    Router.go("/");
  }
});
