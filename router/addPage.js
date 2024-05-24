const express = require("express");
const router = express.Router();
const {join} = require('path')
const UserWord = require('../model/words');



router.get("/",async (req, res) => {
  if (!res.locals.user) {
    
    return res.redirect("/error");
  }

  return res.render("site/add");
});

router.post("/", async (req, res) => {
  
  try {
   

    if(!req.files || !req.body){
        return res.json({
            case:false,
            message:'Veri İletilemedi!'
        })
    }
    
    const userId = req.session.userID


    console.log(req.body)
  
    const { group,english, turkish, sentenceEnglish,sentencesTurkish,image } = req.body;

    

    
    console.log(image)

      // Kullanıcıya özgü kelimeyi veritabanına ekle
      const word = new UserWord({"isDeleted":false, group,userId, english, turkish, sentenceEnglish,sentencesTurkish, image });

      console.log(word)
      await word.save();

      // Kullanıcı ile kelime arasında ilişki kur
     

      res.status(201).json({
        case:true,
        message:'Kelime bilgileri Gönderildi'
    });

  } catch (error) {
    console.log(error);

    return res.json({
      case: false,
      message: "Beklenilmeyen bir hata olustu!",
    });
  }
});

module.exports = router;
