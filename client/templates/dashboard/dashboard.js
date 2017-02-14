Template.dashboardPage.events({
    'click #createStateButton': function(e){
      e.preventDefault();
      console.log("You pressed Go To Create State button");
      Router.go("/createState");
    }
});
