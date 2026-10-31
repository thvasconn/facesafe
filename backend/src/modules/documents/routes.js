const { Router } = require('express');
const controller = require('./controller');
const { requireAuth } = require('../../middlewares/auth');
const { requireRole } = require('../../middlewares/rbac');

const router = Router();

router.get('/', requireAuth, controller.list);
router.get('/:id', requireAuth, controller.getOne);

router.post('/', requireAuth, requireRole('admin_conteudo', 'superadmin'), controller.create);
router.put('/:id', requireAuth, requireRole('admin_conteudo', 'superadmin'), controller.update);
router.post(
  '/:id/legal-review',
  requireAuth,
  requireRole('revisor_compliance', 'superadmin'),
  controller.approveLegalReview
);
router.post('/:id/publish', requireAuth, requireRole('admin_conteudo', 'superadmin'), controller.publish);

module.exports = router;
