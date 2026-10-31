const contentService = require('./service');

async function list(req, res, next) {
  try {
    const { region, procedure } = req.query;
    const content = await contentService.listPublished({ region, procedure });
    return res.json(content);
  } catch (err) {
    return next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const content = await contentService.getById(req.params.id);
    return res.json(content);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const content = await contentService.create(req.body, req.user.id);
    return res.status(201).json(content);
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const content = await contentService.update(req.params.id, req.body, req.user.id);
    return res.json(content);
  } catch (err) {
    return next(err);
  }
}

async function publish(req, res, next) {
  try {
    const content = await contentService.publish(req.params.id, req.user.id, req.ip);
    return res.json(content);
  } catch (err) {
    return next(err);
  }
}

async function getHistory(req, res, next) {
  try {
    const history = await contentService.getHistory(req.params.id);
    return res.json(history);
  } catch (err) {
    return next(err);
  }
}

module.exports = { list, getOne, create, update, publish, getHistory };
