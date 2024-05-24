const { default: mongoose } = require('mongoose')
const mongoos = require('mongoose')
const Schema = mongoos.Schema

const userSchema = new Schema({
    email:{type:String , require , unique: true},
    username:{type:String , require}
    , password:{type:String , require}
})

const User = mongoose.model('User',userSchema)

module.exports = User