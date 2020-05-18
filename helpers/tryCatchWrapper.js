module.exports = func => async (req, res) => {
  try {
    await func(req, res);
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: `Oooops!! Something broke. ${err.message}`,
    });
  }
};