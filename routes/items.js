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
 router.post('/', ensureAuth, async (req, res) => {
     try {
        req.body.user = req.user.id;
         await Item.create(req.body);
        //  res.render(Item);
         res.redirect('/dashboard');
     } catch (err) {
         console.log(err);
     }
    });

//    const item = new Item(req.body);
//    item.save(function(err) {
//        if (err) return res.render('/items/add');
//        console.log(item);
//        res.redirect('/dashboard');
//    });
// });
// function addItem(req, res) {
// const item = new Item(req.body);
// }

router.get('/', ensureAuth, function(req, res){
    try {
        const items = Item.find(req.body)
        .populate('user')
        .sort({ createdAt: 'desc'})
        .lean();
        res.render('items/index');
    } catch (err) {
        console.log(err);
        res.render("error is ", error);
    }
});



router.get('/edit/:id', ensureAuth, function(req, res) {
    Item.findOne({_id: req.params.id,}).lean();
    if (item.user != req.user.id) {
        res.redirect('/items');
    } else { 
    Item.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        runValidators: true,
    });
    res.redirect('/dashboard');
        }
    });

//Delete item
router.delete('/:id', ensureAuth, function(req, res) {
    Item.remove({ _id: req.params.id});
    res.redirect('/dashboard');
});

module.exports = router;