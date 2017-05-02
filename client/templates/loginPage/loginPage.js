if (Meteor.isClient) {
  Template.loginPage.events({
    'submit form': function(e, template) {
      e.preventDefault();
      var emailVar = template.find('#loginEmail').value;
      var passwordVar = template.find('#loginPassword').value;

      // Uses built in Meteor function from package to login to account
      Meteor.loginWithPassword(emailVar, passwordVar, function(error) {
        if (error) {
          alert(error.reason);
        } else Router.go("/dashboardPage");
      });
    },
    
    'click .createAccountButton': function(e) {
      e.preventDefault();
      Router.go("/createAccount");
    }
  });
}
