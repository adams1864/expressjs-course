 import express from 'express'
  const app = express();
const PORT = process.env.PORT || 5004;
 let todolists = [
   
    { taskID: 1, task: "finish your project"},
    { taskID: 2, task: " your project"},
    { taskID: 3, task: " project"},
   

 ];
 app.use(express.json()); // this is a middleware


app.listen(PORT,(req,res)=>{
    console.log(`Server Running on port ${PORT}`);
});

app.get("/todolist",(req, res)=>{
    //res.send(`Hello`);
    
    res.send(todolists);
 });

 app.post("/todolist",(req, res)=>{

    console.log(req.body);
   todolists.push(req.body);
   res.status(201).send("Task added Successfully!");
    return res.send(200);
 });


 app.put("/todolist",(req, res)=>{
    

 });

 app.delete("/todolist/:taskID",async(req, res)=>{
    
    const {taskID} = req.params; 
    const parsedID = parseInt(taskID);//  took the taskID parameter i  assigned to taskID which to the array  key  by Destrucutring method
        
     // and when  i parsed the Tasked  so that the server nows the coming arugment of the parameter is  an Integer


        if(isNaN(parsedID)) return res.sendStatus(400); //  if the coming argument from the client side is not an number it will return a status code "Bad Request"

        const finduserindex = todolists.findIndex((task)=>task.taskID === parsedID);     // to search the task id by it's index i don't understand what it did here??

        if(finduserindex=== -1) return res.sendStatus(404); // if the index under zero it shall return not found error

        todolists.splice(finduserindex, 1); //  else it will delete the data from the array
         
        return res.sendStatus(200); // if all be success it will come up with 200 hunderd  message

  
 });
