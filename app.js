const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs")

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get("/", (req,res)=>{
    res.render("index")
})
app.get("/create", (req,res)=>{
res.render("create")
})
app.get("/hisaab", (req,res)=>{
    res.render("hisaab")
    })
 app.get("/edit",(req,res)=>{
res.render("edit")
    })
app.listen(3000);
