const { Router } = require('express');
const controller = require('./controller');
const { requireAuth } = require('../../middlewares/auth');

const router = Router();

router.post('/', requireAuth, controller.recordConsent);
router.get('/me', requireAuth, controller.getConsentsByUser);

module.exports = router;
