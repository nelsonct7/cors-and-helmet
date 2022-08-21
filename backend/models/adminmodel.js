const mongoose=require('mongoose');
const bcrypt=require('bcrypt')

const adminSchema=mongoose.Schema(
    {
        adminName:{
            type:String,
            required:true
        },
        adminEmail:{
            type:String,
            required:true,
            unique:true
        },
        adminPassword:{ 
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

adminSchema.pre('save',async function(next){
    if(!this.isModified("adminPassword")){
        next() 
    }
    const salt=await bcrypt.genSalt(10);
    this.adminPassword=await bcrypt.hash(this.adminPassword,salt)
});

adminSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.adminPassword)
}

const AdminModel=mongoose.model('AdminModel',adminSchema);

module.exports=AdminModel 