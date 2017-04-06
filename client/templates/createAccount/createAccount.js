Template.createAccount.events({
  // 'click .createButton': function(e) {
  //   var firstName = document.getElementById("firstNameField").value;
  //   var lastName = document.getElementById("lastNameField").value;
  //   var email = document.getElementById("emailField").value;
  //   var password = document.getElementById("passwordField").value;
  //   Accounts.createUser({
  //     firstName: firstName,
  //     lastName: lastName,
  //     email: email,
  //     password: password
  //   });
  // }
  'submit form': function(event) {
    event.preventDefault();
    var emailVar = event.target.signupEmail.value;
    var passwordVar = event.target.signupPassword.value;
    var nameVar = event.target.nameField.value;
    Accounts.createUser({
      email: emailVar,
      password: passwordVar,
      profile: {
        name: nameVar
      }
    });
  }
});
