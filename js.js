const express = require('express')
const app = express()
const port = 3000
const mongoose = require("mongoose")
const path = require('path');
const User = require("./mongo.js")
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function createUser(userName, userPassword) {
  const user = new User({ username: userName, password: userPassword })
  await user.save()
  console.log(user)

}
async function auth(userName, userPassword){
  const query = User.findOne({
    "username": "sw"
  })
  query.select("username password")
  const user = await query.exec()
  if(user == !null)(console.log("xd"))
  else{console.log("xss")}
}


mongoose.connect("mongodb://localhost:27017").then(() => {
  console.log("XD")
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html.html'));
})

app.post("/register", (req, res) => {
  createUser(req.body.fname, req.body.lname)
  auth()
})
app.post("/login", (req, res) => {
  auth()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})