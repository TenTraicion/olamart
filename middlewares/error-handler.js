function handleErrors(error, req, res, next) {
  console.log(error);
  res.status(500).render("base/500");
}

module.exports = handleErrors;