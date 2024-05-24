const express = require('express');
const router = express.Router();
const UserWord = require('../model/words');
const ObjectId = require('mongodb').ObjectId; 

router.get("/", (req, res) => {
    if (!res.locals.user) {
      return res.redirect("/error");
    }
    return res.render("site/exam");
  });

// Sınav için kelimeleri getirme
router.get('/quiz', async (req, res) => {
    const userId  = req.session.userID
    console.log(req.session)
    try {
        console.log(userId)
        const userWords = await UserWord.find({ userId: userId,isDeleted:false });
        console.log("get")
        res.json(userWords);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/words/:userId', async (req, res) => {
    console.log(req.session)
    const { userId } = req.params;
    try {
        const userWords = await UserWord.find({ userId: userId });
        res.json(userWords);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Sınav sonuçlarını kaydetme
router.post('/result', async (req, res) => {
    const { wordId, isCorrect } = req.body;
    const userId = req.session.userID;
    try {
        const userWord = await UserWord.findOne({ userId: userId, "_id": new ObjectId(wordId) });
        if (userWord && !userWord.isDeleted) {
            if (isCorrect == 1) {
                userWord.correctCount += 1;
            } else {
                userWord.correctCount = 0;
            }
            if (userWord.correctCount >= 6) {
               userWord.isDeleted = true;
               await userWord.save();
            } else {
                await userWord.save();
            }

            res.json('Sonuç kaydedildi');
        } else {
            res.status(404).json('Kelime bulunamadı');
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

module.exports = router;
