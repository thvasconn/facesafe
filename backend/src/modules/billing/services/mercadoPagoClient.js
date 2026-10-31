// ponytail: integração real com Mercado Pago fica pra depois — client mockado
// só pra manter a interface pronta pra plugar a SDK real sem refatorar o resto.

async function createCheckoutPreference({ userId, plan }) {
  return {
    checkoutUrl: `https://mercadopago.example.com/checkout/fake-${userId}-${plan}-${Date.now()}`,
    preferenceId: `fake-pref-${Date.now()}`,
  };
}

module.exports = { createCheckoutPreference };
