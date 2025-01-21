import express from 'express'
//import { parse } from 'next/dist/build/swc/generated-native';
//import { use } from 'react';
import db from './dbs.js';
const app =  express();
app.use(express.json());
const PORT = process.env.PORT ||1883;
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
  db.query('SELECT *FROM posts', (err, results) => {
    if (err) {
        return res.status(500).json({ error: 'Database query failed', details: err });
    }
    res.status(200).json(results);
});
 //  res.send(Post);
});
// to get all  blogged posts

app.post('/posts',(req, res)=>{
  const { title, content, author } = req.body; // I'll expect these values coming from the client

  if (title && content && author) {
    const query = `INSERT INTO posts (title, content, author) VALUES (?, ?, ?)`;
    db.query(query, [title, content, author], (err, results) => {
      if (err) {
        return res.status(500).send('Error creating blog post');
      } else {
        res.status(201).send({ msg: 'Blog Created' });
      }
    });
  } else {
    console.log('Error Creating Blog');
    res.status(400).send('Missing fields');
  }
   // console.log(req.body);
   //  Post.push(req.body);
   // return res.send(200);
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
    const {
      body,
      params: { id },
    } = req;
    const parsedID = parseInt(id);
  
    if (isNaN(parsedID)) {
      return res.status(400).send('Invalid ID');
    }
  
    const findUserIndex = Post.findIndex(user => user.id === parsedID);
  
    if (findUserIndex=== -1) {
      return res.status(404).send('Post not found');
    }
    
    Post[findUserIndex]  = {... Post[findUserIndex], ... body};
  
    return res.status(200).send(`Patch Updated Sucessfully`);
  });

 // to update a post we use patch request to only to update partially (THIS WORKD ALSO)


app.delete("/posts/:id",(req, res)=>{
  const {id} = req.params;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
   return res.status(400).send('Invalid ID');
 }
  const findUser = Post.findIndex((user)=>user.id === parsedId);
   if (findUser === -1) {
     return res.status(404).send('Post not found');
   }
   Post.splice(findUser, 1);
   return res.status(200).send(`Deleted Successfully! `);
});// this works



//========================================  FOR COMMENT SECTION

app.post("/posts/:id/comments",(req, res)=>{
        const id =req.params.id;
        const cm = req.body;
         console.log(req.body)
        const parsedId = parseInt(id);
        if(isNaN(parsedId)) return res.status(400);

        const findUserIndex =  Post.findIndex((user)=>user.id === parsedId);
        
        if(findUserIndex === -1) return res.status(404); 
        Post.cm.push(Comments);
        return res.status(200).send('Comment written Successfully');
});
// on the given id try to  write a comments
 app.get("/posts/:id/comments",(req, res)=>{

 })
 // depending on the id of the posts  try to read the  written comments

 app.patch("/comments/:id",(req, res)=>{

 });
 // this functions for updating a comments with giving the id of the comment

 
 app.delete("/comments/:id",(req, res)=>{

 });
 // and the last one is deleting a comment based on it's id.