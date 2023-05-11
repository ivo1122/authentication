const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const User = require("./model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

dotenv.config();
//Connect to DB

mongoose
  .connect(process.env.DB_CONNECT, { })
  .then((dbo) => {});

const uri = process.env.DB_CONNECT;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MONGO DB!");
  } catch (error) {
    console.log(error);
  }
}

connect();

const JWT_SECRET =
  "fdsamkghfdla@@&//%#%gfdsalmfsdamldsa54645ger23fweaf2435234234324231mglčdfsafsdafdsafdas";

const app = express();

app.listen(3000, () => console.log("Listening at 3000"));

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});




app.post("/api/change-password", async (req,res) => {
  const {token, newpassword: plainTextPassword} = req.body;

   if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid Password" });
  } 
 
  try {

    const user = jwt.verify(token, JWT_SECRET)

    const _id = user.id

    const password = await bcrypt.hash(plainTextPassword,10)


    await User.updateOne( {_id}, {
      $set : { password}
    })
  } catch (error) {
    console.log(error)
    res.json({status:"error", error: "Stop that"})
  }
  return res.json({ status: "ok" });

})

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, 
        username: user.username },
      JWT_SECRET
    );
    return res.json({ status: "ok", data: token });
  }

  res.json({ status: "error", data: "Invalid username or password" });
});




app.post("/api/register", async (req, res) => {
  const { username, password: plainTextPassword } = req.body;

  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid Password" });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);
  console.log(await bcrypt.hash(plainTextPassword, 10));

  try {
    const response = await User.create({
      username,
      password,
    });
    console.log("User successfully created", response);
  } catch (error) {
    if (error.code === 11000) {
      //Duplicated keys
      return res.json({ status: "error", error: "Username already exists" });
    }
    throw error;
  }

  res.json({ status: "ok" });
});
