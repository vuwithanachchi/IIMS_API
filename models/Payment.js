const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    paymentid:Number,
    orderid: String,
    paymentdate:String,
    paymentamount:String,
    paymentmethod:String,
    paymentstatus:String 
  });

  schema.plugin(AutoIncrement, {id:'payment_seq',inc_field: 'paymentid'});
  
  module.exports = mongoose.model("Payment", schema); 