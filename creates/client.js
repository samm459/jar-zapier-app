const createClient = async (z, bundle) => {
  const { name, description } = bundle.inputData
  const res = await z.request(`https://jarhq.com/api/customers/client_companies.json`, {
    method: "POST",
    body: {
      client_company: {
        name,
        description
      }
    }
  });
  return res.json;
}

module.exports = {
  operation: {
    inputFields: [
      {
        key: 'name',
        required: true,
        label: 'Name',
        helpText: 'Name of client company'
      },
      {
        key: 'description',
        required: true,
        label: 'Description',
        helpText: 'Description for client company'
      }
    ],
    perform: createClient
  }
}