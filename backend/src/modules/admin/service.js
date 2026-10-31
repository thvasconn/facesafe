const { AuditLog, Incident } = require('../../models');

async function listAuditLogs({ entityType, actorId, from, to, page = 1, limit = 50 } = {}) {
  const filter = {};
  if (entityType) filter.entityType = entityType;
  if (actorId) filter.actor = actorId;
  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) filter.createdAt.$lte = new Date(to);
  }

  const skip = (Number(page) - 1) * Number(limit);
  return AuditLog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
}

async function listIncidents({ severity, region } = {}) {
  const filter = {};
  if (severity) filter.severity = severity;
  if (region) filter.region = region;
  return Incident.find(filter).sort({ createdAt: -1 });
}

async function createIncident(data, userId) {
  return Incident.create({ ...data, reportedBy: userId });
}

module.exports = { listAuditLogs, listIncidents, createIncident };
