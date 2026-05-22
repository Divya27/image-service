const request = require('supertest');

const app = require('../src/app');

jest.mock('../src/services/imageService');

const imageService = require('../src/services/imageService');

describe('Image APIs', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /images', () => {

    it('should upload image successfully', async () => {

      imageService.uploadImage.mockResolvedValue({
        message: 'Image uploaded successfully',
        imageId: '123',
      });

      const response = await request(app)
        .post('/images')
        .attach('image', Buffer.from('fake'), 'test.jpg');

      expect(response.statusCode).toBe(201);

      expect(response.body.message)
        .toBe('Image uploaded successfully');
    });

    it('should return 400 when image missing', async () => {

      imageService.uploadImage.mockRejectedValue(
        new Error('Image is required')
      );

      const response = await request(app)
        .post('/images');

      expect(response.statusCode).toBe(400);
    });

  });

  describe('GET /images', () => {

    it('should list images', async () => {

      imageService.listImages.mockResolvedValue([
        {
          imageId: '1',
          title: 'Vacation',
        },
      ]);

      const response = await request(app)
        .get('/images');

      expect(response.statusCode).toBe(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

  });

  describe('GET /images/:id', () => {

    it('should return image', async () => {

      imageService.getImage.mockResolvedValue({
        imageId: '1',
        downloadUrl: 'signed-url',
      });

      const response = await request(app)
        .get('/images/1');

      expect(response.statusCode).toBe(200);
    });

    it('should return 404', async () => {

      imageService.getImage.mockRejectedValue(
        new Error('Image not found')
      );

      const response = await request(app)
        .get('/images/invalid');

      expect(response.statusCode).toBe(404);
    });

  });

});