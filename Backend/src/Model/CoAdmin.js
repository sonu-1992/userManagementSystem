const mongoose = require('mongoose')

const CoAdminSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

module.exports = mongoose.model("CoAdmin",CoAdminSchema)
