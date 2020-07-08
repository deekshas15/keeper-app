//jshint esversion:6 

const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
var cors=require("cors");

mongoose.connect("mongodb://localhost:27017/toDoDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const toDoSchema={
    title:String,
    content:String
}

const toDoList=mongoose.model("toDoList",toDoSchema);


const app= express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(function(req, res, next) {
    console.log('request', req.url, req.body, req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-token");
    if(req.method === 'OPTIONS') {
        res.end();
    }
    else {
        next();
    }
});


app.get("/", (req,res) =>{
  toDoList.find({},function(err,posts){
    if(!err){
        // console.log(posts);
        res.send(posts);
    }
  })
});

app.post("/", (req,res) =>{
    console.log(req.body,req.body.title)
    const task=new toDoList({
        title:req.body.title,
        content:req.body.content
      })
      task.save(function(err){
        if(!err){
          res.send("added succesfully")
        }
    })
})

app.post("/delete",(req,res)=>{
    console.log(req.body);
    toDoList.deleteOne(req.body.noteId,(err) => {
        if(!err){
            res.send("one item deleted");
        }
    })
})


app.listen(5000,function(){
    console.log("Server started listining on port 5000");
})
