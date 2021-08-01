const mongoose=require('mongoose')
const Schema=mongoose.Schema
const CATEGORY=["gardenFurnitures","games","picnicItems","outKitchen","decorativeItems"]

const productSchema=new Schema({
    title:String,
    srcImg:[{type:String}],
    description:String,
    price:Number,
    quantity:Number,
    dimensions:String,
    maintenance:String,
    comparePricesLink:String,
    category:{type:String,enum:CATEGORY}
})

module.exports=mongoose.model('product',productSchema);