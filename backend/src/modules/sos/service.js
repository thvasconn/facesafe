const { SOSContact } = require('../../models');

async function listActiveContacts() {
  return SOSContact.find({ active: true });
}

async function create(data) {
  return SOSContact.create(data);
}

async function update(id, data) {
  const contact = await SOSContact.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!contact) {
    const err = new Error('Contato SOS não encontrado');
    err.status = 404;
    throw err;
  }
  return contact;
}

module.exports = { listActiveContacts, create, update };
