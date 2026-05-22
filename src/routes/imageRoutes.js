const express = require('express');
const multer = require('multer');

const controller = require('../controllers/imageController');
const router = express.Router();
const upload = multer();

/**
 * @swagger
 * /images:
 *   post:
 *     summary: Upload an image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               userId:
 *                 type: string
 *               tags:
 *                 type: string
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 */
router.post(
  '/',
  upload.single('image'),
  controller.uploadImage
);

/**
 * @swagger
 * /images:
 *   get:
 *     summary: List images
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of images
 */
router.get('/', controller.listImages);

/**
 * @swagger
 * /images/{imageId}:
 *   get:
 *     summary: Get image download URL
 *     parameters:
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Signed URL
 */
router.get('/:imageId', controller.getImage);

/**
 * @swagger
 * /images/{imageId}:
 *   delete:
 *     summary: Delete image
 *     parameters:
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image deleted
 */
router.delete('/:imageId', controller.deleteImage);

module.exports = router;