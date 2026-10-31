const { Router } = require('express');
const controller = require('./controller');
const { requireAuth } = require('../../middlewares/auth');

const router = Router();

router.post('/avulso', requireAuth, controller.purchaseStandalone);

module.exports = router;
