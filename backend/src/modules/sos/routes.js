const { Router } = require('express');
const controller = require('./controller');
const { requireAuth } = require('../../middlewares/auth');
const { requireRole } = require('../../middlewares/rbac');

const router = Router();

router.get('/contacts', requireAuth, controller.list);
router.post('/contacts', requireAuth, requireRole('superadmin'), controller.create);
router.put('/contacts/:id', requireAuth, requireRole('superadmin'), controller.update);

module.exports = router;
