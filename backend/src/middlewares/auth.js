const jwt = require('jsonwebtoken');

/**
 * Espera o access token no header: Authorization: Bearer <token>
 * Preenche req.user com o payload decodificado ({ id, role, clinic }).
 */
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Token de acesso ausente ou mal formatado' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token de acesso inválido ou expirado' });
  }
}

module.exports = { requireAuth };
