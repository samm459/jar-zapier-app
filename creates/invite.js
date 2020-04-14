const sendInvite = async (z, bundle) => {
  const { first_name, last_name, email, phone, client_id } = bundle.inputData
  const res = await z.request(`https://jarhq.com/api/customers/client_companies/${client_id}/invite_user.json`, {
    method: "POST",
    body: {
      invite: {
        first_name,
        last_name,
        email,
        phone
      }
    }
  });
  return res.json;
}

module.exports = {
  key: 'send_invite',
  noun: 'Invite',
  display: {
    label: 'Send Invite',
    description: 'Sends an invite to a chosen email to join a client company account.'
  },
  operation: {
    inputFields: [
      {
        key: 'client_id',
        required: true,
        label: 'Client ID',
        helpText: 'New invites must be associated with a client company. Add the ID of the client company here.'
      },
      {
        key: 'email',
        required: true,
        label: 'Email',
        helpText: 'The email this invite should be send to'
      },
      {
        key: 'first_name',
        required: true,
        label: 'First Name',
        helpText: 'Invite\'s first name'
      },
      {
        key: 'last_name',
        required: true,
        label: 'Last Name',
        helpText: 'Invite\'s last name'
      },
      {
        key: 'phone',
        required: true,
        label: 'Phone Number',
        helpText: 'Invite\'s phone number'
      }
    ],
    perform: sendInvite,
    sample: require('../test/invite_user.json')
  }
}