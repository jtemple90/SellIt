const express = require('express'); 
const router = express.Router();

const passport = require('passport');
const { ensureAuth } = require('../controllers/auth');
const Item = require('../models/Item');

router.post('/:id/messages', ensureAuth, function(req, res) {
    const item = Item.findById(req.params).id, function(err, item) {
        item.reviews.push(req.body);
        item.save(function() {
            res.redirect(`/items/${item._id}`);
        });
    });
};

module.exports = router;