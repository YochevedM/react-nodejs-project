const mongoose = require('mongoose');
const Schema=mongoose.Schema

const userCartSchema = new Schema({
    userId: {type:Schema.Types.ObjectId,ref:'user'},
    cart:[{productId:{type:Schema.Types.ObjectId,ref:'product'},quantity:Number}]
  });

module.exports=mongoose.model('userCart', userCartSchema)