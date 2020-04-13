const authentication = require('./authentication');

const includeApiKey = (request, z, bundle) => {

  return request;
};

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,

  beforeRequest: [includeApiKey],

  afterResponse: [],

  resources: {},

  triggers: {},

  searches: {},

  creates: {}
};

// Finally, export the app.
module.exports = App;
