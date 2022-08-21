const generateTocken = require('../utils/generateTocken');
const AdminModel=require('../models/adminmodel');
const ProductModel=require('../models/productsmodel');
const moment = require('moment')


const registerAdmin = async (req, res) => {
    const {
        adminName,
        adminEmail,
        adminPassword,
    } = req.body
    try{
        const adminExist = await AdminModel.findOne({
            adminEmail
        });
        if (adminExist) {
            res.status(400).send("Email already exist")
        } else {
            await AdminModel.create({
                adminName,
                adminEmail,
                adminPassword,
            }).then((data)=>{
                adminTocken=generateTocken(data._id)
                res.cookie('adminTocken',adminTocken,{ maxAge: 9000000, httpOnly: false})
                res.status(201).json({
                    _id: data._id,
                    adminName,
                    adminEmail,
                    adminPassword,
                })
            }).catch((err)=>{
                res.status(503).send("Resource not created")
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error")
    }
}

const authAdmin =async (req, res) => {
    const {
        adminEmail,
        adminPassword,
    } = req.body;
    try{
        const admin = await AdminModel.findOne({
            adminEmail
        });
        if (admin && (await admin.matchPassword(adminPassword))) {
            console.log(admin);
            const{adminPassword,...sendingData}=admin._doc
            adminTocken=generateTocken(admin._id)
            res.status(201).cookie('adminTocken',adminTocken,{ maxAge: 9000000, httpOnly: false}).json({...sendingData,adminTocken})
            } else {
            res.status(401).send("Authentication failed")
        }
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error")
    }
}

const insertData=async(req,res)=>{
    try{
        const {productName,quantity,amount}=req.body
        const productImage=req.file.fileName;
        await ProductModel.create({
            productName,
            quantity,
            amount,
            productImage:req.file.filename
        }).then((data)=>{
            res.status(201).send("Resource Created Success fully")
        }).catch((err)=>{
            res.status(503).send("Failed to Create Resource")
        })
    }catch(err){
        res.status(500).send("Server Error")
    }

}
const getTopFiveProduct=async(req,res)=>{
    try{
        await ProductModel.find().sort({quantity: -1}).limit(5).then((data)=>{
            console.log(data);
            res.status(200).json(data)
        }).catch((err)=>{
            res.status(404).send("Resource not Found")
        })
    }catch(err){
        res.status(500).send("Server Error")
    }
}
const getdailyreport=async(req,res)=>{
    try{
        const today = moment().startOf('day')
        const totalAmount = await ProductModel.aggregate([{
            $match: {
                createdAt: {
                    $gte: today.toDate(),
                    $lte: moment(today).endOf('day').toDate()
                  }
            },
          },
          {
            $group: {
              _id: null,
              total_count: {
                $sum: "$amount"
              }
            }
          },
        ])
        console.log(totalAmount);
        await ProductModel.find({
            createdAt: {
                $gte: today.toDate(),
                $lte: moment(today).endOf('day').toDate()
              }
        }).then((data)=>{
            res.status(200).json({data,totalAmount})
        }).catch((err)=>{
            res.status(404).send("Resource not Found")
        })
    }catch(err){
        res.status(500).send("Server Error")
    }
}
module.exports={
    registerAdmin,
    authAdmin,
    insertData,
    getTopFiveProduct,
    getdailyreport
}