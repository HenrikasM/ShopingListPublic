const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Item Model

const Item = require('../../models/Item');

//@route GET api/items
//@desc get All Items
//@access Public

router.get('/:userId', (req, res) => {
    Item.aggregate([{$match: {'userID': req.params.userId}}])
    .sort({date:-1})
    .then(items=> res.json(items))
    console.log('test123 '+ req.params.userId);
});

//post
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name,
       userID: req.body.userID // post user id
    });
    newItem.save().then(item => res.json(item));
 });

 //Delete
 router.delete('/:id',auth, (req, res) => {
Item.findById(req.params.id)
.then(item => item.remove().then(() => res.json({success: true})))
.catch(err => res.status(404).json({success:false}));
});


module.exports = router;