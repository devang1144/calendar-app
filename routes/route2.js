const router = require('express').Router();
const Data = require('./model/usermodel');
router.delete(`/:id1/:id2`,async (req,res)=>{
    try{
       if(await Data.findByIdAndUpdate({_id:req.params.id1})) {
          await Data.events.findByIdAndDelete(id2)
          .then(data => res.json(data))
       } 
    }
    catch(err) {
        res.status(400).send(err);
    }
    
})