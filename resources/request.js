const sample = require("../samples/requests.json");

async function list(z) {
  const response = await z.request({
    url: "https://jarhq.com/api/customers/requests.json",
  });
  response.throwForStatus();
  return z.JSON.parse(response.content).data;
}

async function search(z, bundle) {
  const findRequest = async (page = 1) => {
    // Guard from firing more then 60 requests per second
    if (page % 60 === 0) {
      await new Promise(res => setTimeout(res, 60000));
    }
    const response = await z.request({
      url: "https://jarhq.com/api/customers/requests.json",
      params: { page },
    });
    response.throwForStatus();
    const responseObject = z.JSON.parse(response.content);
    const request = responseObject.data.find(
      request => request.subject === bundle.inputData.subject
    );
    if (!request) return await findRequest(page + 1);
    else return request;
  };
  const request = await findRequest();
  return [request];
}

const Request = {
  key: "request",
  noun: "Request",
  list: {
    display: {
      label: "New Request",
      description: "Triggers when a new request is created.",
    },
    operation: {
      perform: list,
    },
  },
  search: {
    display: {
      label: "Find Request",
      description: "Find a request by subject",
    },
    operation: {
      inputFields: [{ key: "subject", required: true }],
      perform: search,
    },
  },
  sample,
};

module.exports = Request;
