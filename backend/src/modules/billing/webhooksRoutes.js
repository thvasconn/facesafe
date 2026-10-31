const { Router } = require('express');
const controller = require('./controller');

const router = Router();

// sem requireAuth — quem chama é o gateway de pagamento, não um usuário logado
router.post('/mercado-pago', controller.handleWebhook);

module.exports = router;
