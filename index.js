const authentication = require('./authentication');
const request = require('./triggers/request');
const invite = require('./creates/invite');
const client = require('./creates/client');

const configureAuth = (request, _, bundle) => {
  request.headers['x-auth-token'] = bundle.authData.api_key
  request.url = request.url.replace(
    /^https:\/\//,
    'https://' 
    + bundle.authData.subdomain 
    + '.'
  )
  return request;
}

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,

  beforeRequest: [ configureAuth ],

  afterResponse: [],

  resources: {},

  triggers: {
    [request.key]: request
  },

  searches: {},

  creates: { 
    [invite.key]: invite, 
    [client.key]: client 
  }
};

module.exports = App;