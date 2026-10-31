const { Router } = require('express');
const controller = require('./controller');
const { requireAuth } = require('../../middlewares/auth');
const { requireRole } = require('../../middlewares/rbac');

const router = Router();

router.get('/', requireAuth, controller.list);
router.get('/:id', requireAuth, controller.getOne);

router.post('/', requireAuth, requireRole('admin_conteudo', 'superadmin'), controller.create);
router.put('/:id', requireAuth, requireRole('admin_conteudo', 'superadmin'), controller.update);
router.post('/:id/publish', requireAuth, requireRole('admin_conteudo', 'superadmin'), controller.publish);
router.get(
  '/:id/history',
  requireAuth,
  requireRole('admin_conteudo', 'revisor_compliance', 'superadmin'),
  controller.getHistory
);

module.exports = router;
