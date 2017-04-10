if (Meteor.isClient) {
  Template.createAccount.events({
    'submit form': function(e, template) {
      e.preventDefault();
      var emailVar = template.find('#email').value;
      var passwordVar = template.find('#password').value;
      var nameVar = template.find('#name').value;
      Accounts.createUser({
        email: emailVar,
        password: passwordVar,
        profile: {
          name: nameVar
        }
      });
      UserAccounts = Meteor.users;
      Router.go("dashboardPage");
    },
    'click #cancelButton': function(e) {
      e.preventDefault();
      Router.go("/loginPage");
    },
    'click .logo': function(e) {
      e.preventDefault();
      Router.go("/loginPage");
    }
  });
}
