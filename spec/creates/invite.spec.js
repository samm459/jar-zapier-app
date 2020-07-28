const zapier = require('zapier-platform-core');
const App = require('../../index');
const nock = require('nock');
const appTester = zapier.createAppTester(App);
const faker = require('faker');

describe('App.creates.invite.operation.perform', () => {
  it('has an invite in the request body', async () => {
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
      .matchHeader('x-auth-token', bundle.authData.api_key)
      .reply(200, require('../../samples/invite_user.json'));

    nockReq.on('request', (_, __, body) => {
      const { invite } = JSON.parse(body);
      expect(invite.first_name).toEqual(bundle.inputData.first_name);
      expect(invite.last_name).toEqual(bundle.inputData.last_name);
      expect(invite.email).toEqual(bundle.inputData.email);
      expect(invite.phone).toEqual(bundle.inputData.phone);
    });

    await appTester(App.creates.send_invite.operation.perform, bundle);
    expect.assertions(4);
  });
  it('has client_id in url', async () => {
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
      .matchHeader('x-auth-token', bundle.authData.api_key)
      .reply(200, require('../../samples/invite_user.json'));

    nockReq.on('request', (req) => {
      expect(req.options.href).toEqual(
        `https://${bundle.authData.subdomain}.jarhq.com`
        + `/api/customers/client_companies/${bundle.inputData.client_id}/invite_user.json`
      );
    });

    await appTester(App.creates.send_invite.operation.perform, bundle);
    expect.assertions(1);
  })
});