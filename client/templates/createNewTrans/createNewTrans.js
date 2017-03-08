Template.createTrans.events({
  'click #createButton': function(e) {
    e.preventDefault();
    console.log("You pressed the create button");
    var name = document.getElementById("nameField").value;
    Transitions.insert({
      name: name
    });
    console.log(name);
  },
  'click #clearButton': function(e) {
    e.preventDefault();
    console.log("You pressed the clear button");
    name = "";
  },
  'click #viewButton': function(e){
    e.preventDefault();
    console.log("You pressed the view transitions button");
    console.log(Transitions.find().fetch());
  },
  'click #cancelButton': function(e){
    e.preventDefault();
    console.log("You pressed the back button");
    Router.go("/");
  },
  'click .logo': function(e){
    e.preventDefault();
    Router.go("/");
  }
});
