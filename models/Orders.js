const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    orderid:Number,
    userid: String,
    orderdate:String,
    orderamount:String,
    orderstatus:String,
    sippingaddress:String,
    paymentmethod:String,
    paymentstatus:String 
  });

  schema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'orderid'});
  
  module.exports = mongoose.model("Orders", schema); 