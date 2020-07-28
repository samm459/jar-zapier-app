async function list(z) {
  const response = await z.request("https://jarhq.com/api/customers/requests.json");
  return z.JSON.parse(response.content).data
}

module.exports = {
  key: 'new_request',
  noun: 'Request',
  display: {
    label: 'New Request',
    description: 'Triggers when a new request is added by a client customer.'
  },
  operation: {
    perform: list,
    sample: require('../samples/requests.json').data[0]
  }
}