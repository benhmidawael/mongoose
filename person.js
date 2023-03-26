let mongoose = require('mongoose')
let PersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
})
module.exports = mongoose.model('Person', PersonSchema)