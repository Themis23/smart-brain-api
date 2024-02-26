const express = require ("express");
const app = express();
const cors = require ("cors");
const knex = require('knex')
const bcrypt = require ("bcrypt-nodejs")

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");




const db = knex({
  client: 'pg',
  connection: {
    connectionString: "dpg-cne4c5icn0vc73f9a9m0-a.frankfurt-postgres.render.com",
    host: "dpg-cne4c5icn0vc73f9a9m0-a",
    port: 5432,
    user: "postgresql_d9e7_user",
    database: "postgresql_d9e7",
    password: "nm8WdLsSM9lwrTKLAdVmSfmIILG9FZNy",
    ssl: { rejectUnauthorized: false },
  }
  });


app.use(express.json());
app.use(cors())
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "dpg-cne4c5icn0vc73f9a9m0-a.frankfurt-postgres.render.com");
})

app.get("/", (req,res)=>{
    res.json("success")
})

app.post("/signin", (req,res) => {signin.handleSignin(req,res,db,bcrypt)})

app.post("/register", (req,res) =>{register.handleRegister(req,res,db,bcrypt)})

app.get("/profile/:id",(req,res) => {profile.handleProfileGet(req,res,db)})

app.put("/image",(req,res) => {image.handleImage(req,res,db)})
app.post("/imageurl",(req,res) => {image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running on port ${process.env.PORT}`)
})

