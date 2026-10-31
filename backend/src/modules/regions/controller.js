const regionsService = require('./service');

async function list(req, res, next) {
  try {
    const regions = await regionsService.listPublished();
    return res.json(regions);
  } catch (err) {
    return next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const region = await regionsService.getBySlug(req.params.slug);
    return res.json(region);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const region = await regionsService.create(req.body);
    return res.status(201).json(region);
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const region = await regionsService.update(req.params.id, req.body);
    return res.json(region);
  } catch (err) {
    return next(err);
  }
}

module.exports = { list, getOne, create, update };
