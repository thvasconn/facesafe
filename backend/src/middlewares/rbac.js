/**
 * Uso: router.post('/admin/content', requireAuth, requireRole('admin_conteudo', 'superadmin'), controller)
 * Precisa rodar DEPOIS de requireAuth (depende de req.user já estar preenchido).
 */
function requireRole(...allowedRoles) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Sem permissão para este recurso' });
    }

    return next();
  };
}

module.exports = { requireRole };
