const { Subscription, Payment, Document, User } = require('../../models');
const mercadoPagoClient = require('./services/mercadoPagoClient');
const auditLogger = require('../admin/services/auditLogger');

const TRIAL_MONTHS = Number(process.env.TRIAL_MONTHS || 4);

async function getMySubscription(userId) {
  const user = await User.findById(userId);
  if (!user) {
    const err = new Error('Usuário não encontrado');
    err.status = 404;
    throw err;
  }

  if (user.clinicRole === 'member' && user.clinic) {
    return Subscription.findOne({ clinic: user.clinic });
  }
  return Subscription.findOne({ user: userId });
}

async function startCheckout({ userId, plan }) {
  const trialEndsAt = new Date();
  trialEndsAt.setMonth(trialEndsAt.getMonth() + TRIAL_MONTHS);

  const subscription = await Subscription.create({
    user: userId,
    plan,
    status: 'trialing',
    trialEndsAt,
  });

  const { checkoutUrl } = await mercadoPagoClient.createCheckoutPreference({ userId, plan });

  return { subscription, checkoutUrl };
}

const WEBHOOK_STATUS_MAP = {
  payment_approved: 'active',
  payment_failed: 'past_due',
  subscription_canceled: 'canceled',
};

async function handleWebhook(payload) {
  const { subscriptionId, event, amountCents, gatewayTransactionId } = payload;

  const newStatus = WEBHOOK_STATUS_MAP[event];
  if (!newStatus) {
    const err = new Error(`Evento de webhook desconhecido: ${event}`);
    err.status = 400;
    throw err;
  }

  const subscription = await Subscription.findByIdAndUpdate(
    subscriptionId,
    { status: newStatus },
    { new: true }
  );
  if (!subscription) {
    const err = new Error('Assinatura não encontrada');
    err.status = 404;
    throw err;
  }

  const payment = await Payment.create({
    user: subscription.user,
    type: 'subscription',
    subscription: subscription._id,
    amountCents: amountCents || 0,
    gatewayTransactionId,
    status: newStatus === 'active' ? 'paid' : newStatus === 'past_due' ? 'failed' : 'refunded',
  });

  await auditLogger.logAction({
    actorId: subscription.user,
    action: 'subscription.status_change',
    entityType: 'Subscription',
    entityId: subscription._id,
    metadata: { event, newStatus },
  });

  return { subscription, payment };
}

async function purchaseStandalone({ userId, documentId }) {
  const document = await Document.findById(documentId);
  if (!document) {
    const err = new Error('Documento não encontrado');
    err.status = 404;
    throw err;
  }
  if (document.priceCents == null) {
    const err = new Error('Documento não está disponível para compra avulsa');
    err.status = 400;
    throw err;
  }

  return Payment.create({
    user: userId,
    type: 'avulso',
    document: document._id,
    amountCents: document.priceCents,
    status: 'pending',
  });
}

module.exports = { getMySubscription, startCheckout, handleWebhook, purchaseStandalone };
