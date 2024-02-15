const express = require("express")
const app = express()
app.use(express.json());
const jwt = require('jsonwebtoken');
const cors = require('cors');
app.use(cors());
// const hbs = require("hbs")
require('./db/connection');
const Users = require('./Model/User')
const CoAdmin = require('./Model/CoAdmin')
const Admin =   require('./Model/Admin');
const User = require("./Model/User");

app.put("/register/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      res.send(user);
    } catch (error) {
      res.send(error);
    }
  });
  
  app.delete("/register/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findByIdAndDelete({ _id: id });
      res.send(user);
    } catch (error) {
      res.send(error);
    }
  });

  app.get('/AdminPanel/:id',async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})
app.get('/AdminPanel',(req,res) => {
    Users.find()
    .then(user => res.json(user))
    .catch(err => res.json(err))
});

app.post("/login", (req,res) =>{
    const {email, password} = req.body;
    Users.findOne({email: email})
    .then(user => {
         if(user) {
            if(user.password == password){
                res.json({"status":"success","userId":user.id})
            } else {
                res.json("password is incorrect")
            }
         } else {
             res.json("no record existed")
         }
    })
})

app.post("/register",async(req,res)=>{
    let user = new Users(req.body);
    let result = await user.save();
    res.send(result);
})

app.post("/CoAdminLogin", (req,res) =>{
    const {email, password} = req.body;
    Users.findOne({email: email})
    .then(user => {
         if(user) {
            if(user.password === password){
              res.json({"status":"success","userId":user.id})
            } else {
                res.json("password is incorrect")
            }
         } else {
             res.json("no record existed")
         }
    })
})

app.post("/CoAdminRegister",async(req,res)=>{
    let coadmin = new CoAdmin(req.body);
    let result = await coadmin.save();
    res.send(result);
})


app.post("/AdminLogin", (req,res) =>{
    const {email, password} = req.body;
    Users.findOne({email: email})
    .then(user => {
         if(user) {
            if(user.password === password){
                res.json("success")
            } else {
                res.json("password is incorrect")
            }
         } else {
             res.json("no record existed")
         }
    })
})

app.post("/AdminRegister",async(req,res)=>{
    let admin = new Admin(req.body);
    let result = await admin.save();
    res.send(result);
})

app.listen(4000);