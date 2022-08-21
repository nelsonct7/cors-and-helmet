const jwt = require('jsonwebtoken')

const generateTocken=(id)=>{
    return jwt.sign({id},process.env.JWT_KEY,{
        expiresIn:"1d"
    });
};

module.exports=generateTocken