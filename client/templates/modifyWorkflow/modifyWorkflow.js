Template.modifyWorkflow.events({
  'click #deleteButton': function(e){
    e.preventDefault();
    console.log("You pressed the delete button");
    var deleteName = document.getElementById("deleteField").value;
    var deleteQuery = StatesList.findOne({ name: deleteName});
    StatesList.remove({
      _id: deleteQuery._id
    });
    document.getElementById("deleteForm").reset();
    console.log(deleteName + ", has been deleted!");
    deleteName = "";
    console.log(StatesList.find().fetch());
    // Router.go("/createState");
  },
  'click #backButton': function(e){
    e.preventDefault();
    console.log("You pressed the back button");
    Router.go("/");
  }
});
/*Template.modifyWorkflow.events {

}*/
