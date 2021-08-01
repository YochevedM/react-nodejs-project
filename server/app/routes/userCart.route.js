const express=require('express')
const router=express.Router()
const controller=require('../controllers/userCart.controller')

router.get('/',controller.find)
router.post('/',controller.create)
router.delete('/',controller.delete)
router.put('/:id',controller.update)

module.exports=router