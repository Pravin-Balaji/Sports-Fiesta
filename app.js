const express=require("express");
const path=require('path');
const bodyparser=require("body-parser");
const mysql=require("mysql");
const dotenv=require("dotenv");
dotenv.config({path: './.env'});

const app=express();
app.set('view engine','hbs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.get('/main.html',function(req,res){
    res.sendFile(__dirname+'/main.html');
})
app.get('/shop.html',function(req,res){
    res.sendFile(__dirname+'/shop.html');
})
app.get('/login.html',function(req,res){
    res.sendFile(__dirname+'/login.html');
})
app.get('/signup.html',function(req,res){
    res.sendFile(__dirname+'/signup.html');
})
app.get('/details.html',function(req,res){
    res.sendFile(__dirname+'/details.html');
})
app.get('/about.html',function(req,res)
{
    res.sendFile(__dirname+"/about.html");
})
app.get('/contact.html',function(req,res)
{
    res.sendFile(__dirname+'/contact.html')
})
app.get('/cart.html',function(req,res)
{
    res.sendFile(__dirname+"/cart.html");
})
let email='';
app.post('/contact.html',function(req,res)
{
    let name=req.body.name;
    email=req.body.email;
    let subject=req.body.subject;
    let message=req.body.message;
    console.log(name,email,subject,message);
    sendmail(email);
})
function sendmail(mailid){
    const mailjet = require ('node-mailjet')
.connect('8b3302f143a79762718944ee952a5895', '2dbbfb5148a4f58fdc3e5e324782335d')
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "saidineshbb123@gmail.com",
        "Name": "SAI"
      },
      "To": [
        {
          "Email": mailid,
          "Name": "SAI"
        }
      ],
      "Subject": "Greetings from Sports Fiesta",
      "TextPart": "Feed back of customer",
      "HTMLPart": "<h3>Thanks for your Feedback!</h3>",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })
}
// app.post('/login.html',function(req,res)
// {
//     const user=req.body.user;
//     const pass=req.body.pass;
//     const q="SELECT * FROM userdetails where username=user";
//     db.query(q,function(err,result,fields)
//     {
//         if (err) throw err;
//         console.log(result);
//     })

// })

app.listen(3000,function()
{
    console.log("App is on 3000");
})
