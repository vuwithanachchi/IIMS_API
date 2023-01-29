const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    componetID:Number,
    componetName: String,
    componetDesc:String,
    imageURL:String,
    qty:String,
    unitPrice:String,
    componetCode:String  
  });

  schema.plugin(AutoIncrement, {id:'comp_seq',inc_field: 'componetID'});
  
  module.exports = mongoose.model("Component", schema);