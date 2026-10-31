const documentsService = require('./service');

async function list(req, res, next) {
  try {
    const documents = await documentsService.listByType(req.query.type);
    return res.json(documents);
  } catch (err) {
    return next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const document = await documentsService.getById(req.params.id);
    return res.json(document);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const document = await documentsService.create(req.body, req.user.id);
    return res.status(201).json(document);
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const document = await documentsService.update(req.params.id, req.body);
    return res.json(document);
  } catch (err) {
    return next(err);
  }
}

async function approveLegalReview(req, res, next) {
  try {
    const document = await documentsService.approveLegalReview(
      req.params.id,
      req.body.reviewerName,
      req.user.id,
      req.ip
    );
    return res.json(document);
  } catch (err) {
    return next(err);
  }
}

async function publish(req, res, next) {
  try {
    const document = await documentsService.publish(req.params.id, req.user.id, req.ip);
    return res.json(document);
  } catch (err) {
    return next(err);
  }
}

async function recordConsent(req, res, next) {
  try {
    const { documentId, name, cpf, professionalRegistration } = req.body;
    const consent = await documentsService.recordConsent({
      userId: req.user.id,
      documentId,
      name,
      cpf,
      professionalRegistration,
      ip: req.ip,
    });
    return res.status(201).json(consent);
  } catch (err) {
    return next(err);
  }
}

async function getConsentsByUser(req, res, next) {
  try {
    const consents = await documentsService.getConsentsByUser(req.user.id);
    return res.json(consents);
  } catch (err) {
    return next(err);
  }
}

module.exports = { list, getOne, create, update, approveLegalReview, publish, recordConsent, getConsentsByUser };
