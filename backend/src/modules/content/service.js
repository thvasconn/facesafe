const { RegionContent, QuickReferenceCard, Region, Procedure } = require('../../models');
const auditLogger = require('../admin/services/auditLogger');

async function listPublished({ region, procedure } = {}) {
  const filter = { status: 'published' };

  if (region) {
    const regionDoc = await Region.findOne({ slug: region });
    filter.region = regionDoc ? regionDoc._id : null;
  }
  if (procedure) {
    const procedureDoc = await Procedure.findOne({ slug: procedure });
    filter.procedure = procedureDoc ? procedureDoc._id : null;
  }

  return RegionContent.find(filter).sort({ createdAt: -1 });
}

async function getById(id) {
  const content = await RegionContent.findOne({ _id: id, status: 'published' })
    .populate('blocks.visualizacaoPlanos.layers')
    .populate('blocks.documentacao.documents');

  if (!content) {
    const err = new Error('Conteúdo não encontrado');
    err.status = 404;
    throw err;
  }
  return content;
}

async function create(data, userId) {
  return RegionContent.create({
    ...data,
    status: 'draft',
    createdBy: userId,
    version: 1,
  });
}

async function update(id, data, userId) {
  const content = await RegionContent.findById(id);
  if (!content) {
    const err = new Error('Conteúdo não encontrado');
    err.status = 404;
    throw err;
  }

  const { note, ...rest } = data;
  Object.assign(content, rest);
  content.version += 1;
  content.updatedBy = userId;
  content.changeLog.push({ version: content.version, editedBy: userId, editedAt: new Date(), note });

  await content.save();
  return content;
}

/**
 * Monta a Ficha Rápida a partir dos blocos do RegionContent — isolada
 * pra ficar testável separado do resto do fluxo de publicação.
 */
function buildQuickReferenceFromContent(regionContent) {
  const { blocks } = regionContent;

  return {
    regionContent: regionContent._id,
    objetivo: blocks.planejamento?.objetivo,
    produto: blocks.planejamento?.produtoCategoria,
    dispositivo: blocks.planejamento?.dispositivo,
    entrada: blocks.planejamento?.marcacao,
    plano: blocks.aplicacaoIlustrada?.profundidade,
    direcaoAngulo: [blocks.aplicacaoIlustrada?.direcao, blocks.aplicacaoIlustrada?.angulo]
      .filter(Boolean)
      .join(' / '),
    riscos: (blocks.complicacoes || []).map((c) => c.apresentacaoClinica).filter(Boolean),
    usgNormal: blocks.ultrassonografia?.correlacaoTexto,
    alerta: (blocks.sinaisAlerta || []).map((s) => s.descricao).filter(Boolean),
    pos: [
      ...(blocks.posProcedimento?.cuidadosImediatos || []),
      ...(blocks.posProcedimento?.orientacaoDomiciliar || []),
    ],
    documentos: (blocks.documentacao?.documents || []).map((d) => d.toString()),
    generatedAt: new Date(),
  };
}

async function publish(id, userId, ip) {
  const content = await RegionContent.findById(id);
  if (!content) {
    const err = new Error('Conteúdo não encontrado');
    err.status = 404;
    throw err;
  }

  content.status = 'published';
  content.publishedAt = new Date();
  await content.save();

  const cardData = buildQuickReferenceFromContent(content);
  await QuickReferenceCard.findOneAndUpdate({ regionContent: content._id }, cardData, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });

  await auditLogger.logAction({
    actorId: userId,
    action: 'content.publish',
    entityType: 'RegionContent',
    entityId: content._id,
    ip,
  });

  return content;
}

async function getHistory(id) {
  const content = await RegionContent.findById(id).select('changeLog');
  if (!content) {
    const err = new Error('Conteúdo não encontrado');
    err.status = 404;
    throw err;
  }
  return content.changeLog;
}

module.exports = { listPublished, getById, create, update, publish, getHistory, buildQuickReferenceFromContent };
