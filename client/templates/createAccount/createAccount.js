if (Meteor.isClient) {
  // Event to create an account using Meteor's Accounts package
  Template.createAccount.events({
    'submit form': function(e, template) {
      e.preventDefault();
      var emailVar = template.find('#email').value;
      var passwordVar = template.find('#password').value;
      var nameVar = template.find('#name').value;
      Accounts.createUser({
        email: emailVar,
        password: passwordVar,
        // We required a name to be inserted as well to a profile
        // Read DOCS for any other misc information to be added to profile
        profile: {
          name: nameVar
        }
      });

      // Set the Meteor collection of users to UserAccounts Collection 
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
