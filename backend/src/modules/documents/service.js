const crypto = require('crypto');
const { Document, ConsentRecord } = require('../../models');
const auditLogger = require('../admin/services/auditLogger');

async function listByType(type) {
  const filter = { status: 'published' };
  if (type) filter.type = type;
  return Document.find(filter);
}

async function getById(id) {
  const document = await Document.findOne({ _id: id, status: 'published' });
  if (!document) {
    const err = new Error('Documento não encontrado');
    err.status = 404;
    throw err;
  }
  return document;
}

async function create(data, userId) {
  return Document.create({
    ...data,
    status: 'draft',
    legalReview: { status: 'pending' },
  });
}

async function update(id, data) {
  const document = await Document.findById(id);
  if (!document) {
    const err = new Error('Documento não encontrado');
    err.status = 404;
    throw err;
  }

  if (document.legalReview.status === 'approved') {
    const err = new Error('Documento já aprovado juridicamente — crie uma nova versão em vez de editar');
    err.status = 400;
    throw err;
  }

  Object.assign(document, data);
  await document.save();
  return document;
}

async function approveLegalReview(id, reviewerName, userId, ip) {
  const document = await Document.findById(id);
  if (!document) {
    const err = new Error('Documento não encontrado');
    err.status = 404;
    throw err;
  }

  document.legalReview = { status: 'approved', reviewedBy: reviewerName, reviewedAt: new Date() };
  await document.save();

  await auditLogger.logAction({
    actorId: userId,
    action: 'document.legal_review_approved',
    entityType: 'Document',
    entityId: document._id,
    ip,
  });

  return document;
}

async function publish(id, userId, ip) {
  const document = await Document.findById(id);
  if (!document) {
    const err = new Error('Documento não encontrado');
    err.status = 404;
    throw err;
  }

  if (document.legalReview.status !== 'approved') {
    const err = new Error('Documento precisa de revisão jurídica aprovada antes de ser publicado');
    err.status = 400;
    throw err;
  }

  document.status = 'published';
  await document.save();

  await auditLogger.logAction({
    actorId: userId,
    action: 'document.publish',
    entityType: 'Document',
    entityId: document._id,
    ip,
  });

  return document;
}

async function recordConsent({ userId, documentId, name, cpf, professionalRegistration, ip }) {
  const document = await Document.findById(documentId);
  if (!document) {
    const err = new Error('Documento não encontrado');
    err.status = 404;
    throw err;
  }

  const documentHash = crypto.createHash('sha256').update(document.bodyText || '').digest('hex');

  const consent = await ConsentRecord.create({
    user: userId,
    document: document._id,
    documentVersion: document.version,
    documentHash,
    nameAtAcceptance: name,
    cpfAtAcceptance: cpf,
    professionalRegistrationAtAcceptance: professionalRegistration,
    ip,
    acceptedAt: new Date(),
    checkboxPreChecked: false,
  });

  await auditLogger.logAction({
    actorId: userId,
    action: 'consent.accept',
    entityType: 'ConsentRecord',
    entityId: consent._id,
    ip,
  });

  return consent;
}

async function getConsentsByUser(userId) {
  return ConsentRecord.find({ user: userId });
}

module.exports = {
  listByType,
  getById,
  create,
  update,
  approveLegalReview,
  publish,
  recordConsent,
  getConsentsByUser,
};
