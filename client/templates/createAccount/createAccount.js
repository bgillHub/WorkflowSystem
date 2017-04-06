Template.createAccount.events({
  'click .createButton': function(e) {
    var firstName = document.getElementById("firstNameField").value;
    var lastName = document.getElementById("lastNameField").value;
    var email = document.getElementById("emailField").value;
    var password = document.getElementById("passwordField").value;
    Accounts.createUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });
  }
});
