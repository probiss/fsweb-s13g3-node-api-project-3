const User = require("../users/users-model");

function logger(req, res, next) {
  //console.log(req);
  console.log(
    `${req.method} --- ${req.originalUrl}   ---- ${new Date().toLocaleString()}`
  );
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "not found" });
    } else {
      req.user = user; //req user diye değişken oluşturduk ve userları atadık
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "İşlem yapılamadı" });
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "gerekli name alanı eksik" });
  } else {
    req.name=name;
    next();
  }
}


function validatePost(req, res, next) {
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ message: "gerekli text alanı eksik" });
  } else {
    req.text=text;
    next();
  }
}

module.exports = {validateUserId, logger, validateUser, validatePost};