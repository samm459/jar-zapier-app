class Authentication {
  static test = {
    url: "https://jarhq.com/api/customers/requests.json"
  }

  static connectionLabel(_, bundle) {
    return bundle.inputData.subdomain;
  }

  static config = {
    type: "custom",
    fields: [
      {
        key: 'api_key',
        helpText: 'Found at the [API Details](https://app.jarhq.com/settings/api-details) page in your Jar account.',
        label: 'API Key', required: true, type: 'string'
      },
      {
        key: 'subdomain',
        helpText: 'The [Jar App](https://app.jarhq.com) will automatically redirect you to your subdomain. For example, if you are redirected to mycompany.jarhq.com, your subdomain is mycompany.',
        label: 'API Key', required: true, type: 'string'
      }
    ],
    test: Authentication.test,
    connectionLabel: Authentication.connectionLabel
  };
}

module.exports = Authentication;