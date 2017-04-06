if (Meteor.isClient) {
  Template.loginPage.events({
    'submit form': function(e, template) {
      e.preventDefault();
      var emailVar = template.find('#loginEmail').value;
      var passwordVar = template.find('#loginPassword').value;
      Meteor.loginWithPassword(emailVar, passwordVar);
      Router.go("dashboardPage");
    },
    'click .createAccountButton': function(e) {
      e.preventDefault();
      Router.go("/createAccount");
    }
  });
}
