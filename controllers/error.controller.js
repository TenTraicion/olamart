function serverError(req, res) {
  res.status(500).render("base/500");
}

function notFound(req, res) {
  res.status(404).render("base/404");
}

module.exports = {
  serverError: serverError,
  notFound: notFound,
}