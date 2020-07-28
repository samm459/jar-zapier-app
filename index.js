const authentication = require('./authentication');
const request = require('./triggers/request');
const invite = require('./creates/invite');
const client = require("./resources/client");

const resources = { [client.key]: client }
const triggers = { [request.key]: request }
const creates = { [invite.key]: invite }

function configureAuth(request, _, bundle) {
  request.headers['x-auth-token'] = bundle.authData.api_key
  request.url = request.url.replace(
    /^https:\/\//,
    'https://'
    + bundle.authData.subdomain
    + '.'
  )
  return request;
}

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  beforeRequest: [configureAuth],
  afterResponse: [],
  resources: resources,
  triggers: triggers,
  creates: creates,
  searches: {}
}