const express = require('express');
const app = express();
const PORT = 1234;
const authRoute = require('./routes/auth');
const Data = require('./model/usermodel');
const posts = require('./routes/posts');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
const verifyToken = require('./routes/verifyToken');
const contact = require('./model/contact');
const nodemailer = require('nodemailer');
const { getMaxListeners } = require('./model/usermodel');
const { ObjectId } = require('mongodb');
// const route2 = require('./routes/route2');
dotenv.config();
//connect to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Database is connected!"));

//email credentials
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "acw.dnsp@gmail.com",
        pass: process.env.PASSWORD 
    }
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

//Middlewares
app.use(express.json());
app.use(cors());
app.use('/api/posts', posts);

//Route Middlewares
app.use('/api/user', authRoute);

app.get('/api/user/register', (req, res) => {
    Data.find({}).then(data => res.json(data));
})

app.get('/api/user/login', (req, res) => {
    Data.find({ }).then(data => res.json(data));
})
// app.get('/api/:id/events', (req, res) => {
//     list.find({ }).then(data => res.json(data));
// })
app.post('/api/user/:id',(req,res)=>{
    try{
        Data.findByIdAndUpdate({_id:req.params.id}, 
        { $push: {
                events:{
                    "eventName":req.body.eventName,
                    "eventDate":req.body.eventDate,
                    "moment":req.body.moment,
                }
            }
        }).exec()
        res.send("success")
        // const data = Data.findById({_id:req.params.id})
        // console.log(data)
        let mailOptions = {
            from: "acw.dnsp@gmail.com", 
            to: req.body.email, 
            subject: `New event added on ${req.body.eventDate}`,
            text: `
            Event : ${req.body.eventName}, is scheduled on ${req.body.eventDate}
                  `
        };
        transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log('Error occurs');
        }
            return console.log('Email sent!!!');
        });
        res.send({
            success: true,
            message: 'It works'
        });
    }
    catch(err) {
        res.status(400).send(err);
    }
    
})
app.get('/api/user', (req, res) => {
    Data.find({ }).then(data => res.json(data));
})
app.get('/api/user/:id', (req, res) => {
    Data.findById({_id:req.params.id}).then(data => res.json(data));
})
app.post('/api/user', async(req, res) => {
    try{
        const user = await Data.findOne({_id:req.body._id});
        res.send(user);
    }catch(err) {
        res.status(400).send(err);
    }
});

app.post('/user/c',async (req, res) =>{
    // console.log(`${req.query}, ${req.email}`);
    const c = new contact({
        name:req.body.name,
        email:req.body.email,
        query:req.body.query
    })
    try{
        const savedUser = await c.save();
        res.send(savedUser);
    }catch(err) {
        res.status(400).send(err);
    }
    let mailOptions = {
            from: "acw.dnsp@gmail.com", 
            to: "namanpatel453@gmail.com", 
            subject: 'Someone tried to contact you',
            text: `
                ${req.body.name}
                ${req.body.query}
                ${req.body.email}
                  `
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log('Error occurs');
        }
        return log('Email sent!!!');
    });
    res.send({
        success: true,
        message: 'It works'
    });

})
// Data.findOne({_id:"5f951a3521086627b08217be"}).findOne({"events._id":"5f9924dfc72cd38f8b1c2ca4"}).then(data => console.log(data))
app.post('/api/user/:id1/:id2', (req, res) => {
    Data.findOneAndUpdate({_id: req.params.id1}, { "$pull" : { "events" : { "_id" : req.params.id2 } } }, { safe: true, multi:true }).then(data => res.json(data)) 
 }); 

app.get('/api/user/:id1/:id2', (req, res) => {
   Data.findOne({
      _id: req.params.id1 , 
      'events._id' : req.params.id2
    },{ 
        "events.$" : 1 
     },).then(data => res.json(data)) 
}); 
app.listen(PORT, () => console.log(`server started at ${PORT}`));