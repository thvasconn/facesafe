const sosService = require('./service');

async function list(req, res, next) {
  try {
    const contacts = await sosService.listActiveContacts();
    return res.json(contacts);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const contact = await sosService.create(req.body);
    return res.status(201).json(contact);
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const contact = await sosService.update(req.params.id, req.body);
    return res.json(contact);
  } catch (err) {
    return next(err);
  }
}

module.exports = { list, create, update };
