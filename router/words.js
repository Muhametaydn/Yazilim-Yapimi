const express = require('express');
const router = express.Router();
const Word = require('../models/Word');
const UserWord = require('../models/UserWord');

// Kelime Ekleme
router.post('/', async (req, res) => {
    try {
        const { userId, english, turkish, sentences, image, pronunciation } = req.body;

        // Kullanıcıya özgü kelimeyi veritabanına ekle
        const word = new Word({ userId, english, turkish, sentences, image, pronunciation });
        await word.save();

        // Kullanıcı ile kelime arasında ilişki kur
        const userWord = new UserWord({ userId, wordId: word._id });
        await userWord.save();

        res.status(201).send('Kelime eklendi');
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
