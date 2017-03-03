Template.createWorkflow.events({
  'click #createButton': function(e) {
    e.preventDefault();
    console.log("You pressed the create button");
    var name = document.getElementById("nameField").value;
    WorkflowsList.insert({
      name: name
    });

    createDiv(name);


    // $('#create').load('templates/selectWorkflow/selectWorkflow.html .selectWFArea');
    // var counter = 1;
    // $("#createButton").click(function () {
    //   $('<div/>',{'id':'workflow' + counter}).html(
    //     $('<label/>').html( 'Workflow #' + counter)
    //   )
    //   .appendTo('.selectWFArea')
    //   counter++;
    // });
    // console.log("Created Workflow: " + name);
    // console.log(WorkflowsList.find().fetch());

  },
  'click #clearButton': function(e) {
    e.preventDefault();
    document.getElementById("createForm").reset();
    console.log("You pressed the clear button");
    name = "";
  },
  'click #cancelButton': function(e) {
    e.preventDefault();
    console.log("You pressed the back button");
    Router.go("/");
  }
});