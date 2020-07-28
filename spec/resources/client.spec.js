const zapier = require('zapier-platform-core');
const faker = require('faker');
const nock = require('nock');

const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('ClientResource', () => {
  describe("list", () => {
    it('returns an array of clients', async () => {
      const bundle = {
        authData: {
          api_key: faker.random.alphaNumeric(27),
          subdomain: faker.lorem.word()
        }
      };

      nock(`https://${bundle.authData.subdomain}.jarhq.com`)
        .get("/api/customers/client_companies.json")
        .matchHeader('x-auth-token', bundle.authData.api_key)
        .reply(200, require('../../samples/client_companies.json'));

      const results = await appTester(App.resources.client.list.operation.perform, bundle);
      expect(results).toBeInstanceOf(Array);
    });
  });
  describe("search", () => {
    it("can find a client by email", async () => {
      const bundle = {
        authData: {
          api_key: faker.random.alphaNumeric(27),
          subdomain: faker.lorem.word()
        },
        inputData: {
          email: "marty@mcfly.com"
        }
      };

      nock(`https://${bundle.authData.subdomain}.jarhq.com`)
        .get("/api/customers/client_companies.json?page=1")
        .matchHeader('x-auth-token', bundle.authData.api_key)
        .reply(200, require('../../samples/client_companies.json'));

      const results = await appTester(App.resources.client.search.operation.perform, bundle);
      expect(results[0].id).toBe(1);
    });
    it("can recursivly search through pages", async () => {
      const bundle = {
        authData: {
          api_key: faker.random.alphaNumeric(27),
          subdomain: faker.lorem.word()
        },
        inputData: {
          email: "sam@morey.com"
        }
      };

      nock(`https://${bundle.authData.subdomain}.jarhq.com`)
        .get("/api/customers/client_companies.json?page=1")
        .matchHeader('x-auth-token', bundle.authData.api_key)
        .reply(200, require('../../samples/client_companies.json'));

      nock(`https://${bundle.authData.subdomain}.jarhq.com`)
        .get("/api/customers/client_companies.json?page=2")
        .matchHeader('x-auth-token', bundle.authData.api_key)
        .reply(200, require('../../samples/client_companies_2.json'));

      const results = await appTester(App.resources.client.search.operation.perform, bundle);
      expect(results[0].id).toBe(2);
    });
  });
  describe("create", () => {
    it("sends a request with client in the body", async () => {
      const bundle = {
        authData: {
          api_key: faker.random.alphaNumeric(27),
          subdomain: faker.lorem.word()
        },
        inputData: {
          companyName: faker.company.companyName(),
          description: faker.lorem.sentence()
        }
      };

      const nockReq = nock(`https://${bundle.authData.subdomain}.jarhq.com`)
        .post("/api/customers/client_companies.json")
        .matchHeader('x-auth-token', bundle.authData.api_key)
        .reply(200, require('../../samples/client_companies.json').data[0]);

      nockReq.on('request', (_, __, body) => {
        const { client_company } = JSON.parse(body);
        expect(client_company.name).toEqual(bundle.inputData.companyName);
        expect(client_company.description).toEqual(bundle.inputData.description);
      });

      await appTester(App.resources.client.create.operation.perform, bundle);
      expect.assertions(2);
    });
  });
});