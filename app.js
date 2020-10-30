const express = require('express');
const app = express();
const PORT = 1234;
const authRoute = require('./routes/auth');
const Data = require('./model/usermodel');
const posts = require('./routes/posts');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
const otpGenerator = require('otp-generator');
const verifyToken = require('./routes/verifyToken');
const contact = require('./model/contact');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cron = require('node-cron');
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
//node-cron schedule
cron.schedule('8 16 * * *',()=>{
    console.log("it's time and it fucking works")
    let mailOptions = {
        from: "acw.dnsp@gmail.com", 
        to: "namanpatel453@gmail.com", 
        subject: `Just a routine mail`,
        text: `
        its time and it fucking works
              `
    };
    transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return console.log('Error occurs');
    }
        return console.log('Email sent!!!');
    });
},{
    schedule:true,
    timezone: "Asia/Kolkata"
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
app.post('/otppass',(req,res)=>{
    Data.findOne({email:req.body.email}).then(data=> res.json(data))
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
            to: 'namanpatel453@gmail.com, devang.iitk@gmail.com', 
            subject: 'Someone tried to contact you',
            text: `
                Sender's Name : ${req.body.name}
                Sender's email : ${req.body.email}
                Message : ${req.body.query}
                  `,
            html: `
            <div style="padding:10px; border-radius: 6px; width:70%; height:50%; margin:0 auto; background-color: white;">
            <img style="border:2px solid #ffc600; margin:0 auto;" src="https://i.ibb.co/VtKcgYs/1999-Sharp.png" alt="1999-Sharp">    
                <h4 style="color: black;">Sender's Name</h4>
                <p style="color: black;">${req.body.name}</p>
                <h4 style="color: black;">Sender's email</h4>
                <p style="color: black;">${req.body.email}</p>
                <h4 style="color: black;">Message</h4>
                <p style="color: black;">${req.body.query}</p>
            </div>
            
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
// app.delete('/api/user/:id1/:id2', (req, res) => {
//     Data.findOne({_id: req.params.id1}, { "events" : { "$pull" : { "_id" : req.params.id2 } } }, { safe: true, multi:true }).then(data => res.json(data)) 
    
// }); 
app.put('/otppass',async(req,res)=>{

    // const token = jwt.sign({pass:req.body.pass1}, process.env.TOKEN_SECRET);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.pass1, salt);
    // console.log(token);
    // await Data.findOneAndUpdate({email:req.body.email},{"$set":{"accounts" : { "password" : hashedPassword }}}, { overwrite: false })
    // res.send("Password Changed");
    const user = await Data.findOne({email:req.body.email})
    const account = user.accounts;
    console.log(account[0].uid);
    await Data.findOneAndUpdate({email:req.body.email},{"$set":{"accounts" : { "kind":account[0].kind, "uid":account[0].uid, "password" : hashedPassword }}})
    res.send("Password Changed");
})
app.put('/api/user/login',async (req,res)=>{
    const query= {"email":req.body.email}
    //console.log(req.body.email)
    const p=otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets:false});
    
    await Data.findOneAndUpdate(req.body ,{"$set" : {"resetpass":p}}).then(resp=>{
        console.log(resp)
    })
    //console.log(m)
    //console.log(resp.resetpass)
    let mailOptions = {
        from: "acw.dnsp@gmail.com", 
        to: req.body.email, 
        subject: 'Password Reset attempted',
            text: `
            Pls use below code to reset your password
            Verification Code : ${p}
                `,
            html: `<div style="padding:10px; border-radius: 6px; width:70%; height:50%; margin:0 auto; background-color: white;">
            <img style="border:2px solid #ffc600; margin:0 auto;" src="https://i.ibb.co/VtKcgYs/1999-Sharp.png" alt="1999-Sharp">    
                <h5 style="color: black;">Pls use below code to reset your password</h5>
                <p style="color: black;">Verification Code : ${p}</p>
            </div>`
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
    console.log(p)
    console.log(req.body)
    //res.send("otp printed")
})

app.put('/api/user/:id1/:id2', async (req, res) => {
    // const user = await Data.findById(req.params.id1);
    const data = await Data.update({_id:req.params.id1}, { '$pull' : { "events" : { "_id" : req.params.id2 } } } )
    res.send(data)
});

app.put('/api/user/e/:id1/:id2', async (req, res) => {
    const data = await Data.update({_id:req.params.id1, "events._id":req.params.id2}, { '$set' : { 'events.$.eventName' : req.body.newEvent } } )
    res.send(data)
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