export function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  if (err.response?.status === 429) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Please try again later.'
    });
  }

  if (err.response?.status === 401) {
    return res.status(500).json({
      error: 'API authentication error. Please contact support.'
    });
  }

  res.status(500).json({
    error: 'An unexpected error occurred. Please try again later.'
  });
}