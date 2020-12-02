const { version } = require("./package.json");
const platformVersion = require("zapier-platform-core").version;
const beforeRequest = require("./utils/beforeRequest");
const authentication = require("./authentication");
const request = require("./resources/request");
const invite = require("./creates/invite");
const client = require("./resources/client");
const resources = { [client.key]: client, [request.key]: request };
const creates = { [invite.key]: invite };

module.exports = {
  version,
  platformVersion,
  authentication,
  beforeRequest,
  afterResponse: [],
  resources,
  triggers: {},
  creates,
  searches: {},
};
