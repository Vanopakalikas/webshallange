const express = require('express')
const app = express()
const port = 3000
const mongoose = require("mongoose")
const path = require('path');
const User = require("./mongo.js")
const bodyParser = require('body-parser');
var request = require('request');
 function updateClient(prompt){
  var clientServerOptions = {
    headers: {
      'Content-Type': 'application/json', // 
      'Authorization': 'Bearer 80494dd790b94e84aa1838e890f30aba',
  },
      uri: 'http://172.16.50.58:5000/api/text/generate',
      body: JSON.stringify(prompt),
      method: 'POST',

  } 
  request(clientServerOptions, function (error, response) {
      console.log(response.body.job) // Given up here, ggs
      nebenoriu(response.body)
  });
 }

 function nebenoriu(postData, prompt){
  var clientServerOptions = {
    headers: {
      'Content-Type': 'application/json', // 
      'Authorization': 'Bearer 80494dd790b94e84aa1838e890f30aba',
  },
      uri: `http://172.16.50.58:5000/api/text/status/${postData}`,
      body: JSON.stringify(prompt),
      method: 'GET',

  }
  request(clientServerOptions, function (error, response) {
    console.log(error,response.body);
  })
}



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));




async function createUser(userName, userPassword) {
  const user = new User({ username: userName, password: userPassword })
  await user.save()
  console.log(user)

}
async function auth(userName, userPassword, res){
  const query = User.findOne({
    "username": userName,
    "password": userPassword,
  })
  query.select("username password")
  const user = await query.exec()
  if(user){
    res.sendFile(path.join(__dirname, 'prompt.html'));

  }
  else{
    res.send("Access Denied")
  }
}




mongoose.connect("mongodb://localhost:27017").then(() => {
  console.log("XD")
});

app.post("/gaidynas", (req, res) => {
    updateClient({"prompt":req.body.fname})
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html.html'));
})

app.post("/register", (req, res) => {
  createUser(req.body.fname, req.body.lname)
})
app.post("/login", (req, res) => {
  auth(req.body.fname, req.body.lname, res)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})