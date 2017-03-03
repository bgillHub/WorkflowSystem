Template.modifyWorkflow.events({
  'click #deleteButton': function(e){
    e.preventDefault();
    var debugRegions = machine.regions;
    var defRegion = machine.defaultRegion;
    if (defRegion){
    }
    else console.log("Default doesnt exist...");
    console.log("Regions: " + debugRegions);
    console.log("Region #: " + debugRegions.length);
    var debugVertices = debugRegions[0];
    var deleteName = document.getElementById("deleteField").value;
    var deleteQuery = WorkflowsList.findOne({ name: deleteName});
    if (deleteQuery){
    WorkflowsList.remove({
      _id: deleteQuery._id
    });
  }
    else alert("No Workflow by "+ deleteName + " Found");
    document.getElementById("deleteForm").reset();
    //console.log(deleteName + ", has been deleted!");
    regional = machine.getDefaultRegion();
    /*if (regional!= null){
      var stateList = regional.vertices;
      for (i in statesArray){
        if (deleteName = i){
          let index = statesArray.indexOf(i);
          statesArray.splice(index, 1);
          console.log(deleteName + ", has been deleted from array!");
          console.log("Array:" + statesArray);
        }
      }
      console.log("States AFTER: " + regional.vertices);
    }*/
  //end if exists
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
