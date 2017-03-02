Template.modifyWorkflow.events({
  'click #deleteButton': function(e){
    e.preventDefault();
    console.log("You pressed the delete button");
    var debugRegions = machine.regions;
    var defRegion = machine.defaultRegion;
    if (defRegion){
      console.log("Default Region Exists!");
      console.log("Vertices: " + defRegion.vertices);
    }
    else console.log("Default doesnt exist...");
    console.log("Regions: " + debugRegions);
    console.log("Region #: " + debugRegions.length);
    var debugVertices = debugRegions[0];
    if (debugVertices){
    console.log("Vertices Name: " + debugVertices.name);
    console.log("Vertices Summary: " + debugVertices);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Vertice #: " + debugVertices.length);
    for (i in debugVertices){
      console.log("Vertex : " + i);
      console.log("Vertex Name: " + i.name);
    }
  }//end debugVertices use
    var deleteName = document.getElementById("deleteField").value;
    var deleteQuery = StatesList.findOne({ name: deleteName});
    if (deleteQuery){
    StatesList.remove({
      _id: deleteQuery._id
    });
    document.getElementById("deleteForm").reset();
    console.log(deleteName + ", has been deleted!");
    regional = machine.getDefaultRegion();
    if (regional!= null){
      console.log("States BEFORE: " + regional.vertices);
      var stateList = regional.vertices;
      for (i in stateList){
        if (deleteName = i.name){
          i.remove;
          console.log(deleteName + ", has been deleted from machine!");
        }
      }
      console.log("States AFTER: " + regional.vertices);
    }
  }//end if exists
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
