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
dotenv.config();

//connect to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Database is connected!"));

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
                    "moment":req.body.moment
                }
            }
        }).exec()
        res.send("success")
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

app.listen(PORT, () => console.log(`server started at ${PORT}`));