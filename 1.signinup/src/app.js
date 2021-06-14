const { ifError } = require("assert");
const express = require("express");
const path = require("path");
const app = express();
require("./db/conn");

const Register = require("./models/registers");
const { json } = require("express");
const { log } = require("console");

const port = process.env.PORT || 1000;
const static_path = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(static_path))

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/login", (req, res) =>{
    res.render("login");
})

app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;

        const registerUser = new Register({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        const registered = await registerUser.save();
        res.status(201).render("index");

    } catch (error) {
        res.status(400).send(error);
    }
})
app.post("/login", async(req, res) => {
    try{
      const username1 = req.body.username;
      const password1 = req.body.password;
       
      const useremail = await Register.findOne({username:username1});
        console.log(useremail.password === password1);
      if(useremail.password === password1){
          console.log(password1);
         // res.status(201).render("/uday/htmlfile.html");
         res.sendFile(path.join(__dirname+'/home.html'));
      }else{
          res.send("Password Invaild");
      }
    }
     catch(error){
        res.status(400).send("INVALID");
    }
})

app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
})

