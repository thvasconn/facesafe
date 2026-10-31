const billingService = require('./service');

async function getMySubscription(req, res, next) {
  try {
    const subscription = await billingService.getMySubscription(req.user.id);
    return res.json(subscription);
  } catch (err) {
    return next(err);
  }
}

async function startCheckout(req, res, next) {
  try {
    const result = await billingService.startCheckout({ userId: req.user.id, plan: req.body.plan });
    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
}

// TODO: validar assinatura do webhook antes de produção
async function handleWebhook(req, res, next) {
  try {
    const result = await billingService.handleWebhook(req.body);
    return res.json(result);
  } catch (err) {
    return next(err);
  }
}

async function purchaseStandalone(req, res, next) {
  try {
    const payment = await billingService.purchaseStandalone({
      userId: req.user.id,
      documentId: req.body.documentId,
    });
    return res.status(201).json(payment);
  } catch (err) {
    return next(err);
  }
}

module.exports = { getMySubscription, startCheckout, handleWebhook, purchaseStandalone };
