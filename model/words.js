const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserWordSchema = new Schema({
    userId: { type: String, ref: 'User', required: true },
    group :  String ,
    correctCount: { type: Number, default: 0 },
    english: { type: String },
    turkish: { type: String },
    sentenceEnglish: { type: String },
    sentencesTurkish: { type: String },
    isDeleted: Boolean,
    image: String,
    pronunciation: String
});

UserWordSchema.index({ userId: 1 }, { unique: false });

module.exports = mongoose.model('Word', UserWordSchema);
