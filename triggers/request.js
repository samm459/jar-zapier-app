const listRequests = async(z) => {
  const res = await z.request("https://jarhq.com/api/customers/requests.json");
  return res.json.data;
}

module.exports = {
  key: 'new_request',
  noun: 'Request',
  display: {
    label: 'New Request',
    description: 'Triggers when a new request is added by a client customer.'
  },
  operation: {
    perform: listRequests
  }
}