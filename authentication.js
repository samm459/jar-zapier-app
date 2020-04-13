const testAuth = (z /*, bundle */) => {

};

module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'apiKey',
      label: 'API Key', required: true, type: 'string'
    }
  ],
  test: testAuth,
  connectionLabel: (z, bundle) => {
    return bundle.inputData.username;
  }
};
