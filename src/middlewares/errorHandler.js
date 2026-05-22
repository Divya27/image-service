module.exports = (err, req, res, next) => {

  console.error(err);

  if (err.message === 'Image not found') {
    return res.status(404).json({
      message: err.message,
    });
  }

  if (
    err.message === 'Image is required' ||
    err.message === 'Invalid file type'
  ) {
    return res.status(400).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: 'Internal Server Error',
  });

};