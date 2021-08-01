const mongoose=require('mongoose')

mongoose.Promise=global.Promise

let db={}
db.mongoose=mongoose
db.product=require('./product.model')
db.userCart=require('./userCart.model')
db.user=require('./user.model')

module.exports=db;