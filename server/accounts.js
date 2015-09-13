Meteor.startup(function() {
  //meteor developer login
  ServiceConfiguration.configurations.remove({service: 'meteor-developer'});
  ServiceConfiguration.configurations.insert({
    service: 'meteor-developer',
    clientId: Meteor.settings.meteorDeveloper.clientId,
    secret: Meteor.settings.meteorDeveloper.secret
  });

  //facebook login
  ServiceConfiguration.configurations.remove({service: 'facebook'});
  ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: Meteor.settings.facebookAccounts.appId,
    secret: Meteor.settings.facebookAccounts.secret
  });
});

Accounts.onCreateUser(function(options, user) {
  user.emails = user.services['facebook'].email;
  user.profile.facebooklink = user.services['facebook'].link;
  //user.profile = options.profile;
  return user;
});
