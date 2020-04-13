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

    nock(`https://${bundle.authData.subdomain}.jarhq.com`)
      .get("/api/customers/requests.json")
      .reply(200, require('./requests.json'));

    const resposne = await appTester(App.triggers.request.operation.perform, bundle);

    expect(resposne).toBeInstanceOf(Array);
  });
});

describe('App.creates.invite.operation.perform', () => {
  it('has an invite in the request body', async() => {
    const bundle = {
      authData: {
        api_key: faker.random.alphaNumeric(27),
        subdomain: faker.lorem.word()
      },
      inputData: {
        client_id: faker.random.number(100),
        email: faker.internet.email(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        phone: faker.phone.phoneNumber()
      }
    };

    const nockReq = nock(`https://${bundle.authData.subdomain}.jarhq.com`)
      .post(`/api/customers/client_companies/${bundle.inputData.client_id}/invite_user.json`)
      .reply(200, require('./invite_user.json'));

    nockReq.on('request', (_, __, body) => {
      const {invite} = JSON.parse(body);
      expect(invite.first_name).toEqual(bundle.inputData.first_name);
      expect(invite.last_name).toEqual(bundle.inputData.last_name);
      expect(invite.email).toEqual(bundle.inputData.email);
      expect(invite.phone).toEqual(bundle.inputData.phone);
    });

    await appTester(App.creates.invite.operation.perform, bundle);
    expect.assertions(4);
  });
  it('has client_id in url', async() => {
    const bundle = {
      authData: {
        api_key: faker.random.alphaNumeric(27),
        subdomain: faker.lorem.word()
      },
      inputData: {
        client_id: faker.random.number(100),
        email: faker.internet.email(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        phone: faker.phone.phoneNumber()
      }
    };

    const nockReq = nock(`https://${bundle.authData.subdomain}.jarhq.com`)
      .post(`/api/customers/client_companies/${bundle.inputData.client_id}/invite_user.json`)
      .reply(200, require('./invite_user.json'));

    nockReq.on('request', (req) => {
      expect(req.options.href).toEqual(
        `https://${bundle.authData.subdomain}.jarhq.com`
        + `/api/customers/client_companies/${bundle.inputData.client_id}/invite_user.json`
      );
    });

    await appTester(App.creates.invite.operation.perform, bundle);
    expect.assertions(1);
  })
});