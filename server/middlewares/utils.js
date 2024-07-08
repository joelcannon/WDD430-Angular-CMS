// Improved error handling function with action-specific messages
const handleError = (res, action, error) => {
  res.status(500).json({
    message: `An error occurred ${action}`,
    error: error.message || error,
  });
};

module.exports = { handleError };
