class RequestTrigger {
  static async list(z) {
    const response = await z.request("https://jarhq.com/api/customers/requests.json");
    return z.JSON.parse(response.content).data
  }

  static config = {
    key: 'new_request',
    noun: 'Request',
    display: {
      label: 'New Request',
      description: 'Triggers when a new request is added by a client customer.'
    },
    operation: {
      perform: RequestTrigger.list,
      sample: require('../samples/requests.json').data[0]
    }
  }
}

module.exports = RequestTrigger;