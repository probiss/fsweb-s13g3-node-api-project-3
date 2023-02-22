const users = require("../users/users-model");

function logger(req, res, next) {
  console.log(
    `${new Date} --- ${req.url}   ---- ${req.ip}`
  )
  next();
}

function validateUserId(req, res, next) {
  const userId = req.params.id;
  const user = users.find(user => user.id === userId);

  if (user) {
    req.user = user;
    next()
  } else {
    res.status(404).json({ message: "kullanıcı bulunamadı" });
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "gerekli name alanı eksik" });
  } else {
    next();
  }
}


function validatePost(req, res, next) {
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ message: "gerekli text alanı eksik" });
  } else {
    next();
  }
}

module.exports = {validateUserId, logger, validateUser, validatePost};