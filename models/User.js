const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    userid:Number,
    username: String,
    email:String,
    password:String
  });

  schema.plugin(AutoIncrement, {id:'user_seq',inc_field: 'userid'});
  
  module.exports = mongoose.model("Users", schema); 