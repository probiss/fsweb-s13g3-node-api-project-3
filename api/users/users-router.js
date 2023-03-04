const express = require("express");
const router = express.Router();
router.use(express.json());

const User = require("./users-model");
const Post = require("../posts/posts-model");
const {logger,validateUserId,validateUser,validatePost } = require("../middleware/middleware");




router.get("/", (req, res, next) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  User
    .get()
    .then((user) => res.status(201).json(user))
    .catch((error) => {
      next(error); //aşağıda yazdığımız error middleware'e gidiyor.
    });
  //catch kısmını bir de catch(next) olarak da yazabiliriz.
});

router.get("/:id", validateUserId, (req, res, next) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
  res.json(req.user);
  //console.log(req.user);
});

router.post("/", validateUser, (req, res, next) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
  User
    .insert({ name: req.name })
    .then((user) => res.json(user))
    .catch();
});

router.put("/:id", validateUserId, validateUser, async (req, res) => {
  //ilk önce id'yi kontrol edeceğiz sonra user.
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  try {
    await User.update(req.params.id, { name: req.name });
    let updated = await User.getById(req.params.id);
    res.status(201).json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateUserId, async (req, res, next) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    await User.remove(req.params.id);
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/posts", validateUserId, async (req, res, next) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    let userPost = await User.getUserPosts(req.params.id);
    res.json(userPost);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/posts",validateUserId,validatePost,async (req, res, next) => {
    // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
    // user id yi doğrulayan bir ara yazılım gereklidir.
    // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
    try {
      let insertedPost = await Post.insert({
        user_id: req.params.id,
        text: req.text,
      });
      res.json(insertedPost);
    } catch (error) {
      next(error);
    }
  }
);

router.use((err, req, res) => {
  res.status(err.status || 500).json({
    customMessage: "Bir hata oluştu",
    message: err.message,
  });
});
// routerı dışa aktarmayı unutmayın
module.exports = router;