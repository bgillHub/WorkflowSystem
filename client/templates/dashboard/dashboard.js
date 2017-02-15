Template.dashboardPage.events({
    'click #createStateButton': function(e){
      e.preventDefault();
      console.log("You pressed Go To Create State button");
      Router.go("/createState");
<<<<<<< HEAD
    },
    'click #createTransButton': function(e){
      e.preventDefault();
      console.log("You pressed Go To Create Transition button");
      Router.go("/createTrans");
    },
    'click .viewWorkflowArea': function(e) {
      e.preventDefault();
      console.log("You pressed the view button");
      console.log(StatesList.find().fetch());
      Router.go("/modifyWorkflow");
    },
=======
    }
>>>>>>> 9758ff05df16406ee208c58871d86a3fb17e3fdf
});
