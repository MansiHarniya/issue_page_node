const express=require("express")
const router=express.Router();
const Users=require("../model/users")
const bcrypt=require("bcrypt");



router.get("/reset-password",async(req,res)=>{
    const token=req.query.token;
    const tokenData=await Users.findOne({token:token})
    if(tokenData){
        const password=req.body.password
        // bcrypt.hash(password,10,async(err,hash)=>{
            
            const newPassword=await password
            const result=await Users.findByIdAndUpdate({_id:tokenData.id},{
                $set:{
                    password:newPassword,
                    token:"",
                    confirm_password:"",
                }
            },{
                new:true
            })
            res.status(200).json({Msg:"User Password has been reset",data:result})

    
        // })
    }else{
        res.status(200).json({Msg:"This Link has been expired"})
    }
})

module.exports=router