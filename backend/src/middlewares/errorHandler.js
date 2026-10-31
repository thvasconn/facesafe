// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error('[error]', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Dados inválidos', details: err.message });
  }

  if (err.code === 11000) {
    return res.status(409).json({ error: 'Registro duplicado', field: Object.keys(err.keyPattern || {})[0] });
  }

  return res.status(err.status || 500).json({ error: err.message || 'Erro interno' });
}

module.exports = { errorHandler };
