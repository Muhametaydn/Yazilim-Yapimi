const express = require("express");
const router = express.Router();

const {join} = require('path')
const User = require(join(__dirname, "..", "model", "userModel.js"));

router.get("/", (req, res) => {
  if (res.locals.user) {
    return res.redirect("/error");
  }
  return res.render("site/login");
});

router.post("/", async (req, res) => {
  try {
    if(res.locals.user){
      return res.json({
        case: false,
        message: "kullanıcı oturumu zaten açık.",
      });
    }

    let {username , password} = req.body
    const userControl = await User.find({'username':username , 'password':password}).exec()
  



    if (userControl.length != 1) {
      return res.json({
        case: false,
        message: "Kullanıcı adı yada şifre hatalıdır.",
      });
    }


    let ID = userControl[0]._id
    Id = String(ID)
    req.session.userID = ID
   

    return res.json({
      case: true,
      message: "Giriş işlemleri Başarılı, Yönlendiriliyorsunuz...",
    });




  } catch (error) {
    console.log(error);
    return res.json({
      case: false,
      message: "Beklenilmeyen bir hata oluştu.",
    });
  }
});

module.exports = router;
