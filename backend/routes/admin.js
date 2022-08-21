const express = require('express');
const router = express.Router();
const AdminModel=require('../models/adminmodel')
const {registerAdmin,authAdmin,insertData,getTopFiveProduct,getdailyreport}=require('../controllers/admincontroller')
const productPicStore=require('../config/multerloader')
const jwt=require('jsonwebtoken')
/*Tocken Validation */
const tockenValidator=async(req,res,next)=>{
  try{
    const jwtTocken=JSON.parse(req.headers.tocken)
    const verified=jwt.verify(jwtTocken,process.env.JWT_KEY)
    const adminId=verified.id
    if(verified){
        await AdminModel.findOne({
            _id:adminId
        }).then((data)=>{
          next()
        }).catch((err)=>{
          res.status(401).send("Admin validation failed")
        })
    }else{
        res.status(401).json({
            message:'Tocken validation failed'
        })
    }
  }catch(err){
    res.status(500).send("Server Error")
  }
  
}


/* register */
router.route('/register').post(registerAdmin)

/* login */
router.route('/login').post(authAdmin)

/* create data */
router.route('/insertdata').post(tockenValidator,productPicStore.single('productImage'),insertData)
/* get Top selling */
router.route('/gettop5').get(tockenValidator,getTopFiveProduct)
/* get report */
router.route('/getdailyreport').get(tockenValidator,getdailyreport)
module.exports = router;
