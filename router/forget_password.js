const express=require("express")
const router=express.Router();
const User=require("../model/users")
const config1=require("../db/config1")
const nodemailer=require("nodemailer")
const randomstring=require("randomstring")

const sednMail=async(email,token)=>{

const transport=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:config1.emailUser,
        pass:config1.emailPassword
    }
})

const mailOptions={
    from:config1.emailUser,
    to:email,
    subject:"For Reset Password",
    html:`<p>Please copy the link<a href="http://192.168.1.212:3000/reset-password?token=${token}" and reset your password</a></p>`
    
}
transport.sendMail(mailOptions,(info)=>{
    if(info){
        console.log('Message sent: ' + info.response);
   }
})
}

router.post("/forget-password",async(req,res)=>{
const userdata=await User.findOne({email:req.body.email})
console.log(req.body.email,"email")
if(userdata){
const randomString=randomstring.generate();
const data=await User.updateOne({email:req.body.email},{$set:{token:randomString}})
console.log(userdata.email,"aaa")
sednMail(userdata.email,randomString)
res.status(200).json({Msg:"Plz check your email"})

}else{
    res.status(200).json({Msg:"Email does not exists"})
}
})

module.exports=router