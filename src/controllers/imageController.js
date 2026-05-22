const imageService = require('../services/imageService');

exports.uploadImage = async (req, res, next) => {
  try {
    const result = await imageService.uploadImage(req);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

exports.listImages = async (req, res, next) => {
  try {
    const result = await imageService.listImages(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.getImage = async (req, res, next) => {
  try {
    const result = await imageService.getImage(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    const result = await imageService.deleteImage(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};