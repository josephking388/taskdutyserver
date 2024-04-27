const TASKS = require('../model/taskModel');

//post ftn, C -- for Create CRUD operations


const createTask = async(req,res)=>{
    const {title, description,tags} = req.body;
    req.body.createdBy = req.user.userId;

    if(!title || !description || !tags){
        res.status(400).json({success:false,
        message:"please fill all fields"});
        return
    }
    try{
        await TASKS.create(req.body);
        res.status(201).json({success:true,
        message:"task created successfully"});
    } catch (error) {
        res.status(500).json(error);
    }
}

//get ftn, R -- for read in CRUD operations
const getAllTasksByUser = async(req,res)=>{
    const {userId} = req.user
    try {
        const task = await TASKS.find({createdBy:userId}).populate("createdBy");
        res.status(200).json({success:true,message:"users task",task})    
    } catch (error) {
        res.status(500).json(error)
        console.log(error.message);
    }
}


//params function for getting a single task created by a user

const singleTask =async (req,res)=>{
    const {taskId} = req.params;
    const {userId} = req.user;

    try {
        const task = await TASKS.findOne({
        _id:taskId,
        createdBy:userId
    }).populate("createdBy");
    res.status(200).json({success:true,task})

    } catch (error) {
        res.status(500).json(error.message)

    }

}


//delete function, D--- for delete in CRUD operation

const deleteTask =async (req,res)=>{
    const {taskId} = req.params;
    const {userId} = req.user;

    try {
        await TASKS.findOneAndDelete({_Id:taskId,
            createdBy:userId});
            res.status(200).json({success:true,
            message:"deleted successfully"})
        

    } catch (error) {
        res.status(500).json(error)

    }

}


//update ftn, U-- for update in CRUD operations
const updateTask =async (req,res)=>{
    const {taskId} = req.params;
    const {userId} = req.user;

    try {
        const task = await TASKS.findOneAndUpdate
        ({_id:taskId,createdby:userId},req.body,{new:true,
        runValidators:true}).populate("createdBy");
        res.status(200).json({success:true,task,
            message:"task updated succesfully"})        
 
        } catch (error) {
            res.status(500).json(error)
        }
}




module.exports = {
    createTask,
    getAllTasksByUser,
    singleTask,
    deleteTask,
    updateTask
}