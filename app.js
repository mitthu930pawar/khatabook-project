const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs")

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get("/",(req,res)=>{
 fs.readdir(`./hisaab`, function(err, files){
if(err) return res.status(500).send(err);
res.render("index",{files: files});
 })
})
app.get("/create",(req,res)=>{
  res.render("create");
})


app.get("/edit/:filename",function(req,res){
  fs.readFile(`./hisaab/${req.params.filename}`,"utf-8", function(err,filedata){
if(err)return res.status(500).send(err);
res.render("edit", {filedata , filename: req.params.filename})
  })

  app.post("/update/:filename", function(req,res){
fs.writeFile(`/hisaab/${req.params.filename}`)
  })
})


app.post("/createhisaab", function(req,res){
   var currentDate = new Date() 
var date=`${ currentDate.getDate()}-${currentDate.getMonth()+1}-${currentDate.getFullYear()};`
var fileNumber= 1;
let fileName;
while(true){
  fileName =`./hisaab/${date}_${fileNumber}.txt`
  if (!fs.existsSync(fileName)){
    break;
  }
 fileNumber++;
}
fs.writeFile(fileName,req.body.content, function(err){
if(err) return res.status(500).send(err);
res.redirect("/")
})
})
app.listen(3000);
