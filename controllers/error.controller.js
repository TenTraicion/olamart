function serverError(req, res) {
  res.render("base/500");
}

function notFound(req, res) {
  res.render("base/404");
}

module.exports = {
  serverError: serverError,
  notFound: notFound,
}