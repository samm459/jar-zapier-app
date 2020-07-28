const sample = require('../samples/client_companies.json');

async function list(z) {
  const response = await z.request({
    url: 'https://jarhq.com/api/customers/client_companies.json'
  });
  response.throwForStatus();
  return z.JSON.parse(response.content).data;
}

async function search(z, bundle) {
  const findClient = async (page = 1) => {
    const response = await z.request({
      url: 'https://jarhq.com/api/customers/client_companies.json',
      params: { page }
    });
    response.throwForStatus()
    const responseObject = z.JSON.parse(response.content);
    const client = responseObject.data.find(client => client.users.find(user => user.email === bundle.inputData.email));
    if (!client) return await findClient(page + 1);
    return client;
  }
  const client = await findClient();
  return [client];
}

async function create(z, bundle) {
  const { companyName, description } = bundle.inputData;
  const response = await z.request({
    method: 'POST',
    url: 'https://jarhq.com/api/customers/client_companies.json',
    body: {
      client_company: {
        name: companyName,
        description
      }
    }
  });
  response.throwForStatus()
  return z.JSON.parse(response.content);
}

module.exports = {
  key: 'client',
  noun: 'Client',
  list: {
    display: {
      label: 'New Client',
      description: 'Triggers when a new client is created.'
    },
    operation: {
      perform: list,
    }
  },
  search: {
    display: {
      label: 'Find Client',
      description: 'Finds a client by email.'
    },
    operation: {
      inputFields: [
        { key: 'email', required: true }
      ],
      perform: search
    }
  },
  create: {
    display: {
      label: 'Create Client',
      description: 'Creates a new client company account'
    },
    operation: {
      inputFields: [
        {
          key: 'companyName',
          required: true,
          label: 'Company Name',
          helpText: 'Name of client company'
        },
        {
          key: 'description',
          required: true,
          label: 'Description',
          helpText: 'Description for client company'
        }
      ],
      perform: create
    }
  },
  sample: sample.data[0]
}