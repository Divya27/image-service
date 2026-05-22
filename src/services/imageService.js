const { v4: uuidv4 } = require('uuid');

const repository = require('../repositories/imageRepository');
const s3Service = require('./s3Service');

exports.uploadImage = async (req) => {
  if (!req.file) {
    throw new Error('Image is required');
  }

  const imageId = uuidv4();

  const s3Key = `images/${imageId}-${req.file.originalname}`;

  await s3Service.uploadFile(s3Key, req.file);

  const metadata = {
    imageId,
    title: req.body.title || '',
    userId: req.body.userId || '',
    tags: req.body.tags ? req.body.tags.split(',') : [],
    uploadedAt: new Date().toISOString(),
    s3Key,
    contentType: req.file.mimetype,
  };

  await repository.saveImageMetadata(metadata);

  return {
    message: 'Image uploaded successfully',
    imageId,
  };
};

exports.listImages = async (filters) => {
  let items = await repository.listImages();

  if (filters.userId) {
    items = items.filter((x) => x.userId === filters.userId);
  }

  if (filters.tag) {
    items = items.filter((x) =>
      x.tags.includes(filters.tag)
    );
  }

  return items;
};

exports.getImage = async (imageId) => {
  const image = await repository.getImageById(imageId);

  if (!image) {
    throw new Error('Image not found');
  }

  const downloadUrl = await s3Service.getDownloadUrl(image.s3Key);

  return {
    ...image,
    downloadUrl,
  };
};

exports.deleteImage = async (imageId) => {
  const image = await repository.getImageById(imageId);

  if (!image) {
    throw new Error('Image not found');
  }

  await s3Service.deleteFile(image.s3Key);

  await repository.deleteImage(imageId);

  return {
    message: 'Image deleted successfully',
  };
};