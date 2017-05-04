Template.addUser.events({
  'click #backButton': function(e){
    e.preventDefault();
    console.log("You pressed the back button");
    Router.go("/dashboardPage");
  },
  'click .logo': function(e){
    e.preventDefault();
    Router.go("/dashboardPage");
  },
  'click .logoutLink': function(e) {
    e.preventDefault();
    Meteor.logout();
    Router.go("/loginPage");
  },
  'click .addUser' : function(e) {
    e.preventDefault();
    console.log("Function Called via js button click");
    console.log("Selected Name:" +  document.getElementById('userDrop').value);
    user = UserAccounts.findOne({profile: {name: document.getElementById('userDrop').value}})
    userKey = user._id;
    console.log("User Key: " + userKey);
    var wfDoc =  Workflows.findOne({workflowName: wfName});
    var UserArray = wfDoc.Users;
    console.log("Pre User Array:" +  UserArray + ", type:" + typeof UserArray);
    //UserArray = UserArray + userKey;
    console.log("User Array:" +  UserArray);
    UserArray.push(userKey);
    console.log("User Array 2:" +  UserArray);
    Workflows.update({_id: wfDoc._id}, {$set: {Users: UserArray}});
    alert(document.getElementById('userDrop').value + " was added!!");
  }
});
Template.addUser.onRendered = function() {
  console.log("LOaded via on rendered");
  UserCursor = UserAccounts.find().fetch();
  //WFArray.push(WorkflowsList.find().fetch());
  //console.log("Array " + WFArray);
  userContainer = document.getElementById("userDrop");
  userContainer.innerHTML = null;
  // var add = document.createDocumentFragment();
  var a = 0;
  for (i in UserCursor) {
    name = UserCursor[i].profile.name;
    console.log("Name: " + name);
    wfContainer.innerHTML +=  '<option>'+ name +'</option>';
    a++
  }
}

Template.addUser.rendered = function() {
  console.log("LOaded via rendered");
  UserCursor = UserAccounts.find().fetch();
  //WFArray.push(WorkflowsList.find().fetch());
  //console.log("Array " + WFArray);
  userContainer = document.getElementById("userDrop");
  userContainer.innerHTML = null;
  // var add = document.createDocumentFragment();
  var a = 0;
  for (i in UserCursor) {
    name = UserCursor[i].profile.name;
    console.log("Name: " + name);
    userContainer.innerHTML +=  '<option>'+ name +'</option>';
    a++
  }
}
