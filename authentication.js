const test = {
  url: "https://jarhq.com/api/customers/requests.json"
}

function connectionLabel(_, bundle) {
  return bundle.inputData.subdomain;
}

module.exports = {
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
      label: 'Subdomain', required: true, type: 'string'
    }
  ],
  test: test,
  connectionLabel: connectionLabel
};