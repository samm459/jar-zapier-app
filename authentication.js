const testAuth = async(z) => {
  const res = await z.request("https://jarhq.com/api/customers/requests.json");
  return res;
};

module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'api_key',
      label: 'API Key', required: true, type: 'string'
    },
    {
      key: 'subdomain',
      label: 'API Key', required: true, type: 'string'
    }
  ],
  test: testAuth,
  connectionLabel: (_, bundle) => {
    return bundle.inputData.subdomain;
  }
};