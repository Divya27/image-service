const express = require('express');
const router = express.Router();

const upload = require('../middlewares/upload');
const imageController = require('../controllers/imageController');

router.post('/', upload.single('image'), imageController.uploadImage);
router.get('/', imageController.listImages);
router.get('/:id', imageController.getImage);
router.delete('/:id', imageController.deleteImage);

module.exports = router;