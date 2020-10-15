const router = require('express').Router();
const list = require('../model/list');

router.post('/', async(req, res) => {
    const listItem = new list({
        todo:req.body.todo,
        month:req.body.month,
        day:req.body.day,
        year:req.body.year
    })
    try{
        const savedlistItem = await listItem.save();
        res.send(savedlistItem);
    }catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;