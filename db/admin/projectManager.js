const mongoose=require("mongoose")

const ProjectManagerSchema=new mongoose.Schema({
    admin_id:{
type:mongoose.Schema.Types.ObjectId
},

name:{
    type:String,
    required:true
},

email:{type:String,
    required:true
},
password:{
type:String,
required:true
},
company_name:{type:String,
    required:true
}, 
technology:{type:String,
    required:true
}, 
type:{type:String,
    required:true
}, 
timestamp:{type:Date,
    default:Date.now()
}, 
})

module.exports=mongoose.model("ProjectManager",ProjectManagerSchema)