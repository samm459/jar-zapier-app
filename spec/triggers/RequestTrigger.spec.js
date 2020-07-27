const zapier = require('zapier-platform-core');
const App = require('../../index');
const nock = require('nock');
const appTester = zapier.createAppTester(App);
const faker = require('faker');

describe('App.triggers.request.operation.perform', () => {
  it('returns data[]', async () => {
    const bundle = {
      authData: {
        api_key: faker.random.alphaNumeric(27),
        subdomain: faker.lorem.word()
      }
    };

    nock(`https://${bundle.authData.subdomain}.jarhq.com`)
      .get("/api/customers/requests.json")
      .matchHeader('x-auth-token', bundle.authData.api_key)
      .reply(200, require('../../samples/requests.json'));

    const resposne = await appTester(
      App.triggers.new_request.operation.perform, bundle
    );

    expect(resposne).toBeInstanceOf(Array);
  });
});