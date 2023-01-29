const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    shippingid:Number,
    orderid: String,
    shippingdate:String,
    shippingaddress:String,
    trackingnumber:String,
    shippingstatus:String
  });

  schema.plugin(AutoIncrement, {id:'ship_seq',inc_field: 'shippingid'});
  
  module.exports = mongoose.model("Shipping", schema); 