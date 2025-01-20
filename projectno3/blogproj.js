import express from 'express'
//import { use } from 'react';
const app =  express();
app.use(express.json());
const PORT = process.env.PORT ||1880;
const Post = [{id:1, title: "First post" ,content:"This is my fist post",author: "Alice"},
    {id:2, title: "Second post" ,content:"This is my Second Human",author: "Damon"},
    {id:3, title: "Litrature is my Dream post" ,content:"Damon is bad",author: "Stefan"}
];
 
const Comments = [{id:"", postId: "" ,content:"",author: ""}];
app.listen(PORT,(req, res)=>{
    console.log(`Server Running on port ${PORT}`);
});
// display on which server  started and implicates it can be accessed by that port
app.get('/posts',(req, res)=>{

   res.send(Post);
});
// to get all  blogged posts

app.post('/posts',(req, res)=>{
    console.log(req.body);
     Post.push(req.body);
    return res.send(200);
});
// to create a blog page  we use post method

app.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    const parsedID = parseInt(id);
  
    if (isNaN(parsedID)) {
      return res.status(400).send('Invalid ID');
    }
  
    const findUser = Post.find(user => user.id === parsedID);
  
    if (!findUser) {
      return res.status(404).send('Post not found');
    }
  
    return res.status(200).send(findUser);
  });
  
  
// to read or get a specific   post we will call it by it's :id route parameter

app.patch('/posts/:id',(req,res )=>{
    const {body,params:{id},} = req;
    const parsedID = parseInt(id);
  
    if (isNaN(parsedID)) {
      return res.status(400).send('Invalid ID');
    }
  
    const findUser = Post.find(user => user.id === parsedID);
  
    if (!findUser) {
      return res.status(404).send('Post not found');
    }
    
    mockusers[finduserindex]  = {... mockusers[finduserindex], ... body};
  
    return res.status(200).send(findUser);
  });

 // to update a post we use patch request to only to update partially


app.delete("/posts/:id",(req, res)=>{


});