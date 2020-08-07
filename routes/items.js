const express = require('express'); 
const router = express.Router();

const passport = require('passport');
const { ensureAuth } = require('../controllers/auth');
const Item = require('../models/Item');

// add item page
router.get('/add', ensureAuth, function(req, res) {
    res.render('items/add');
});

// process add form
router.post('/', ensureAuth, function(req, res) {
    const item = new Item(req.body);
    item.save(function(err) {
        if (err) return res.redirect('/items/add');
        console.log(item);
        res.redirect('/dashboard');
    });
});

// => {
//     try {
//         req.body.user = req.user.id;
//         await Item.create(req.body);
//         res.redirect('/dashboard');
//     } catch (err) {
//         console.log(err);
//         res.render('error');
//     }});



router.get('/', ensureAuth, function(req, res){
const items = Item.find(req.body)
.populate('user')
.sort({ createdAt: 'desc'})
.lean();
res.render('items/index', {
    items
});
});



router.get('/edit/:id', ensureAuth, function(req, res) {
    Item.findOne({_id: req.params.id,}).lean();
    if (item.user != req.user.id) {
        res.redirect('/items');
    } else { 
        res.render('items/edit', {
            item,
        });
    }
});

module.exports = router;