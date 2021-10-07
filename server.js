const express = require('express');
const { reset } = require('nodemon');
const data = require('./Data');
const app = express();
app.use(express.json());
app.get("/users",(req,res)=>{
    
    res.json(data.users)
    res.send("hello world")
});
app.get("/children",(req,res)=>{
    
    res.json(data.children)
    res.send("hello world")
});
app.get("/users/:id",(req,res)=>{
     const id = req.params.id;
     const result = data.users.find(user => user.id == id)
     if(result)
     { 
        res.json(result);
        res.send("hello world")
      }
     else
     {   res.status(404).json({msg:"Not Found"})
         
         //res.statusCode = 404 ;
         //res.statusMessage = 'Not Found';
         //res.setHeader('Content-Type', 'text/plain');
         res.send("Not Found")
     }
    
 });
 app.get("/users/:id/children/:idchild",(req,res)=>{
    const id = req.params.id;
    const idchild = req.params.idchild;
    const result = data.children.find(child =>child.id == idchild && child.parent_id == id)
       
    if(result)
    { 
        res.json(result);
     }
    else
    {   
        res.status(404).json({msg:"Not Found"})
    }
    res.send("hello world")
});

app.post("/users",(req,res)=>{
    const body = req.body;
    
    const result = data.users.find(user => user.id == body.id);
    if(result)
    {
        res.status(409).json({msg:"Id already exists"});
    }
    else{
        data.users.push(body);
        res.status(201).json(body);
    }
}); 
app.post("/children",(req,res)=>{
    const body = req.body;
    const r = Object.values(body).includes(null)
    
    if(r){res.status(409).json({msg:" missing data"});}
    else
    {
    const result = data.children.find(child =>child.id == body.id);
    if(!result )
    {   
        res.status(409).json({msg:"Id already exists",r:r});
    }
    else{
        data.users.push(body);
        res.status(201).json(body);
    }}
}); 
app.delete("/users/:id",(req,res)=>
{
    const id = req.params.id;
    const result = data.users.find(user=>user.id == id);
    if(!result)
    {
        res.status(404).json({
            msg:"Not Found"
        });
    }
    else
    {
        const index = data.users.indexOf(result);
        data.users.splice(index,1);
        reset.sendStatus(204);
    }
})
app.delete("/children/:id",(req,res)=>
{
    const id = req.params.id;
    const result = data.children.find(child=>child.id == id);
    if(!result)
    {
        res.status(404).json({
            msg:"Not Found"
        });
    }
    else
    {
        const index = data.children.indexOf(result);
        data.children.splice(index,1);
        reset.sendStatus(204);
    }
})
app.listen(3000,()=>{console.log("server started")});