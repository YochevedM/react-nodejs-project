const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    password:String,
    firstName:String,
    lastName:String,
    email:String,
    city:String,
    address:String,
    apartmentNum:Number,
    postalCode:String,
    phoneNumber:String
});

module.exports=mongoose.model('user',userSchema);