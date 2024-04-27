const express = require('express');
const {createTask, getAllTasksByUser,singleTask,deleteTask, updateTask} = require("../controllers/taskController");
const router = express.Router();
const auth = require('../middleware/auth.js')


//post request
router.post("/task",auth,createTask);
// Get request ----- for getting user task
router.get("/task/:userId",auth,getAllTasksByUser);
//params for single task

router.get("/singletask/:taskId",auth,singleTask)
//delete request, D ---- for delete in CRUD
router.delete('/task/:taskId',auth,deleteTask);
//update task, D---- for update in CRUD
router.patch('/updatetask/:taskId',auth,updateTask)





module.exports = router;