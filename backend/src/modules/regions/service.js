const { Region } = require('../../models');

async function listPublished() {
  return Region.find({ status: 'published' }).sort({ order: 1 });
}

async function getBySlug(slug) {
  const region = await Region.findOne({ slug, status: 'published' });
  if (!region) {
    const err = new Error('Região não encontrada');
    err.status = 404;
    throw err;
  }
  return region;
}

async function create(data) {
  return Region.create(data);
}

async function update(id, data) {
  const region = await Region.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!region) {
    const err = new Error('Região não encontrada');
    err.status = 404;
    throw err;
  }
  return region;
}

module.exports = { listPublished, getBySlug, create, update };
