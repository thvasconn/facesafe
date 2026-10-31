const { Router } = require('express');
const controller = require('./controller');
const { requireAuth } = require('../../middlewares/auth');

const router = Router();

router.get('/me', requireAuth, controller.getMySubscription);
router.post('/checkout', requireAuth, controller.startCheckout);

module.exports = router;
