const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const { join } = require("path");
const User = require(join(__dirname, "..", "model", "userModel.js"));

router.get("/", (req, res) => {
  if (res.locals.user) {
    return res.redirect("/error");
  }
  return res.render("site/register");
});

router.get("/data", (req, res) => {
  console.log(req.query);
});

router.post("/data", (req, res) => {
  console.log(req.body);
});

router.get("/data/:id", (req, res) => {
  console.log(req.params);
});

router.post("/", async (req, res) => {
  try {
    if (!req.body) {
      return res.json({
        case: false,
        message: "Veri iletilmedi!",
      });
    }

    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.json({
        case: false,
        message: "Veri iletilmedi!",
      });
    }

    const gmailRGX = new RegExp(
      /@(gmail\.com|hotmail\.com|outlook\.com)$/i,
      "g"
    );
    if (!gmailRGX.test(email)) {
      return res.json({
        case: false,
        message: "Email alanı hatalıdır",
      });
    }

    const passwordRGX = new RegExp(/^.{2,20}$/);
    if (!passwordRGX.test(password)) {
      return res.json({
        case: false,
        message: "Şifre 2 karakterden kısa ve 20 karakterden uzun olamaz",
      });
    }

    const userControl = await User.find({ email: email }).exec();
    if (userControl.length != 0) {
      return res.json({
        case: false,
        message: "Email alanı zaten kayıtlıdır.",
      });
    }

    const user = new User({
      email: email,
      username: username,
      password: password,
    });

    user
      .save()
      .then((data) => {
        let ID = data._id
        ID = String(ID)
        req.session.userID = ID
        return res.json({
          case: true,
          message: "Kullanıcı kaydı başarılı bir şekilde yapılmıstır.",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          case: false,
          message: "Bir hata olustu.",
        });
      });

    
  } catch (error) {
    console.log(error);
    return res.json({
      case: false,
      message: "Beklenmeyen bir hata olustu!",
    });
  }
});

module.exports = router;


