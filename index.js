const Authentication = require('./Authentication');
const RequestTrigger = require('./triggers/RequestTrigger');
const InviteCreator = require('./creates/InviteCreator');
const ClientResource = require("./resources/ClientResource");

class App {
  static resources = { [ClientResource.config.key]: ClientResource.config }
  static triggers = { [RequestTrigger.config.key]: RequestTrigger.config }
  static creates = { [InviteCreator.config.key]: InviteCreator.config }

  static configureAuth(request, _, bundle) {
    request.headers['x-auth-token'] = bundle.authData.api_key
    request.url = request.url.replace(
      /^https:\/\//,
      'https://'
      + bundle.authData.subdomain
      + '.'
    )
    return request;
  }

  static config = {
    version: require('./package.json').version,
    platformVersion: require('zapier-platform-core').version,
    authentication: Authentication.config,
    beforeRequest: [App.configureAuth],
    afterResponse: [],
    resources: App.resources,
    triggers: App.triggers,
    creates: App.creates,
    searches: {}
  }
}

module.exports = App.config;