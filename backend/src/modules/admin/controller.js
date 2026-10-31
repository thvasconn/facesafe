const adminService = require('./service');

async function listAuditLogs(req, res, next) {
  try {
    const { entityType, actorId, from, to, page, limit } = req.query;
    const logs = await adminService.listAuditLogs({ entityType, actorId, from, to, page, limit });
    return res.json(logs);
  } catch (err) {
    return next(err);
  }
}

async function listIncidents(req, res, next) {
  try {
    const { severity, region } = req.query;
    const incidents = await adminService.listIncidents({ severity, region });
    return res.json(incidents);
  } catch (err) {
    return next(err);
  }
}

async function createIncident(req, res, next) {
  try {
    const incident = await adminService.createIncident(req.body, req.user.id);
    return res.status(201).json(incident);
  } catch (err) {
    return next(err);
  }
}

module.exports = { listAuditLogs, listIncidents, createIncident };
