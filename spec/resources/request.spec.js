const zapier = require("zapier-platform-core");
const App = require("../../index");
const nock = require("nock");
const appTester = zapier.createAppTester(App);
const faker = require("faker");

describe("Request Resource", () => {
  describe("list", () => {
    it("returns an array of requests", async () => {
      const bundle = {
        authData: {
          api_key: faker.random.alphaNumeric(27),
          subdomain: faker.lorem.word(),
        },
      };

      nock(`https://${bundle.authData.subdomain}.jarhq.com`)
        .get("/api/customers/requests.json")
        .matchHeader("x-auth-token", bundle.authData.api_key)
        .reply(200, require("../../samples/requests.json"));

      const response = await appTester(
        App.resources.request.list.operation.perform,
        bundle
      );

      expect(response).toBeInstanceOf(Array);
    });
  });
  describe("search", () => {
    it("can find a request by subject", async () => {
      const bundle = {
        authData: {
          api_key: faker.random.alphaNumeric(27),
          subdomain: faker.lorem.word(),
        },
        inputData: {
          subject: "Welcome to Jar!",
        },
      };

      nock(`https://${bundle.authData.subdomain}.jarhq.com`)
        .get("/api/customers/requests.json?page=1")
        .matchHeader("x-auth-token", bundle.authData.api_key)
        .reply(200, require("../../samples/requests.json"));

      const results = await appTester(
        App.resources.request.search.operation.perform,
        bundle
      );

      expect(results[0].id).toBe(1);
    });
    it("can search through pages", async () => {
      const bundle = {
        authData: {
          api_key: faker.random.alphaNumeric(27),
          subdomain: faker.lorem.word(),
        },
        inputData: {
          subject: "Sample Request",
        },
      };

      nock(`https://${bundle.authData.subdomain}.jarhq.com`)
        .get("/api/customers/requests.json?page=1")
        .matchHeader("x-auth-token", bundle.authData.api_key)
        .reply(200, require("../../samples/requests.json"));

      nock(`https://${bundle.authData.subdomain}.jarhq.com`)
        .get("/api/customers/requests.json?page=2")
        .matchHeader("x-auth-token", bundle.authData.api_key)
        .reply(200, require("../../samples/requests_2.json"));

      const results = await appTester(
        App.resources.request.search.operation.perform,
        bundle
      );

      expect(results[0].id).toBe(2);
    });
  });
});
