const { Router } = require('express');
const controller = require('./controller');
const { requireAuth } = require('../../middlewares/auth');
const { requireRole } = require('../../middlewares/rbac');

const router = Router();

// leitura pública (pro assinante logado ler o atlas)
router.get('/', requireAuth, controller.list);
router.get('/:slug', requireAuth, controller.getOne);

// administração de conteúdo
router.post('/', requireAuth, requireRole('admin_conteudo', 'superadmin'), controller.create);
router.put('/:id', requireAuth, requireRole('admin_conteudo', 'superadmin'), controller.update);

module.exports = router;
