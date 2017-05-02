// Initialization of the databases 
StatesList = new Mongo.Collection('states');
Workflows = new Mongo.Collection('workflows');
WorkflowsList = new Mongo.Collection('workflowNames');
UserAccounts = Meteor.users;
Transitions = new Mongo.Collection('transitions');
