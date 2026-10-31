const { AuditLog } = require('../../../models');

async function logAction({ actorId, action, entityType, entityId, ip, metadata }) {
  return AuditLog.create({
    actor: actorId,
    action,
    entityType,
    entityId,
    ip,
    metadata,
  });
}

module.exports = { logAction };
