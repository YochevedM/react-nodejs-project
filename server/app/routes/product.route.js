
const express=require('express')
const router=express.Router()
const controller = require("../controllers/product.controller");

router.get('/', controller.find);
router.put('/:id',controller.update)


module.exports=router
