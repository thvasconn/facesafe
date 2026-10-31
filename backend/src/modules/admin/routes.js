const { Router } = require('express');
const controller = require('./controller');
const { requireAuth } = require('../../middlewares/auth');
const { requireRole } = require('../../middlewares/rbac');

const router = Router();

router.get('/audit-logs', requireAuth, requireRole('revisor_compliance', 'superadmin'), controller.listAuditLogs);
router.get(
  '/incidents',
  requireAuth,
  requireRole('revisor_compliance', 'superadmin', 'admin_conteudo'),
  controller.listIncidents
);
router.post('/incidents', requireAuth, controller.createIncident);

module.exports = router;
