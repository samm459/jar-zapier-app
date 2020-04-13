const zapier = require('zapier-platform-core');
const App = require('../index');
const nock = require('nock');
const appTester = zapier.createAppTester(App);
const faker = require('faker');

describe('App.authentication.test', () => {
  it('adds api key to header', async () => {
    const bundle = {
      authData: {
        api_key: faker.random.alphaNumeric(27),
        subdomain: faker.lorem.word()
      }
    };

    const nockReq = nock(`https://${bundle.authData.subdomain}.jarhq.com`)
      .get("/api/customers/requests.json")
      .reply(200);

    nockReq.on('request', (req) => {
      expect(req.options.headers['x-auth-token'][0])
        .toEqual(bundle.authData.api_key);
      expect(req.options.href)
        .toEqual(`https://${bundle.authData.subdomain}.jarhq.com/api/customers/requests.json`);
    })
    await appTester(App.authentication.test, bundle);
    expect.assertions(2);
  });
});

describe('App.triggers.request.operation.perform', () => {
  it('returns data[]', async() => {
    const bundle = {
      authData: {
        api_key: faker.random.alphaNumeric(27),
        subdomain: faker.lorem.word()
      }
    };

    const nockReq = nock(`https://${bundle.authData.subdomain}.jarhq.com`)
      .get("/api/customers/requests.json")
      .reply(200, require('./requests.json'));

    const resposne = await appTester(App.triggers.request.operation.perform, bundle);

    expect(resposne).toBeInstanceOf(Array);
  });
});