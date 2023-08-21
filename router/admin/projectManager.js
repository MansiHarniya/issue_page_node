const express=require("express")
const router=express.Router()
const projectManager=require("../../db/admin/projectManager")
const mongoose=require("mongoose")

//Get Method
router.get("/projectmanager",(req,res)=>{
    projectManager.find()
    .then((result)=>{
        res.status(200).json({
            AllProjectManagerData:result
        })
    })
})

//Post Method
router.post("/projectmanager",(req,res)=>{
projectManager.find({email:req.body.email}).exec().then(async(user)=>{
    if(user.length>=1){
res.status(200).json({
    msg:"Email already exists"
})
    }else{
        const pManager=new projectManager({
            name:req.body.name,
            email:req.body.email,
            company_name:req.body.company_name,
            technology:req.body.technology,
            type:req.body.type,
            admin_id:new mongoose.Types.ObjectId,
            timestamp:req.body.timestamp         
        })
        const result=await pManager.save()
        res.send(result)
        console.log(result,"ProjectManager")
    }
})
})

//Put Method
router.put("/projectmanager/edit/:id",(req,res)=>{
    console.log((req.params.id),"id")
    projectManager.findOneAndUpdate({admin_id:req.params.id},{
        $set:{
            name:req.body.name,
            email:req.body.email,
            company_name:req.body.company_name,
            technology:req.body.technology,
            type:req.body.type,
            timestamp:req.body.timestamp

        }
    }).then((result)=>{
        res.status(200).json({
            UpdatedData:result
        })
        console.log(result,"update ProjectManager")

    })
})

module.exports=router