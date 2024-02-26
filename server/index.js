const express  = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const  AdminModel = require('./model/admin');
const ProductModel = require('./model/Product');
const UserModel = require('./model/User');
const bcrypt = require('bcrypt'); // Add bcrypt import
const cookieParser = require("cookie-parser"); // Correct cookie-parser spelling
const jwt = require("jsonwebtoken");
const categoryModel = require('./model/category');



const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST","DELETE"],
    credentials:true

}))
app.use(express.json())
app.use(cookieParser())

mongoose.connect("mongodb://127.0.0.1:27017/admin");

const veriftUser = (req, res, next) =>{
    const token = req.cookies.token;
    if(!token){
        return res.json("token not awailable")
    }
    else{
        jwt.verify(token, "jwt", (err, decoded)=>{
            if(err) return res.json("token is wrong")
                next()
            
        })
    }

}

app.get("/checkAuth", veriftUser, (req, res) => {
    return res.json("success");
});



app.post("/admin", (req, res) =>{
    const {email, password} = req.body;
    UserModel.findOne({email:email})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, (err, response) => {
              if(response)
            {
                const token = jwt.sign({email: user.email}, "jwt", {expiresIn: "1d"})
                res.cookie("token", token);
                res.json("sucess");
            }
            else
            {
                res.json("password incorrect")
            }   
            })
           

        }
        else{
            res.json("not existed")
        }
    })


})
app.get("/products", (req, res) => {
    ProductModel.find({})
    .then(products => res.json(products))
    .catch(err => console.log(err))
})

app.get("/Category", (req,res)=>{
    categoryModel.find({})
    .then((category)=>res.json(category))
    .catch((err)=>res.json(err))
})

app.get("/logout", (req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"success"})
})

app.delete("/deleteUser/:id", (req, res) =>{
    const id = req.params.id;
    ProductModel.findByIdAndDelete({_id:id})
    .then(user =>res.json(user))
    .catch(err => res.json(err))
  })
  app.delete("/deleteCategory/:id", (req, res) =>{
    const id = req.params.id;
    categoryModel.findByIdAndDelete({_id:id})
    .then(category =>res.json(category))
    .catch(err => res.json(err))
  })


  app.post("/Register", (req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash =>{
        UserModel.create({name, email, password: hash})
      .then(result => res.json(result)) // Corrected: Use arrow function to assign value to result
      .catch(err => res.json(err));
    }).catch(err => console.log(err))
    
  });
app.post("/createProduct", (req,res)=>{
    ProductModel.create(req.body)
    .then(products => res.json(products))
    .catch(err =>res.json(err))
})
app.post("/createCategory", (req,res)=>{
    categoryModel.create(req.body)
    .then(category => res.json(category))
    .catch((err)=> res.json(err))
})
  
app.listen(3001, ()=>{
    console.log("server running on 3001")
})
