const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    cartid:Number,
    userid: String,
    imageURL:String,
    componetID:String,
    componetName: String,
    quantity:String, 

  });

  schema.plugin(AutoIncrement, {id:'cart_seq',inc_field: 'cartid'});
  
  module.exports = mongoose.model("Cart", schema); 