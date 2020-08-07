const express = require('express'); 
const router = express.Router();
const passport = require('passport');
const { ensureAuth, ensureGuest } = require('../controllers/auth');
const Item = require('../models/Item');


//login page
router.get('/', ensureGuest, function(req, res) {
    res.render('login', {
      layout: 'login',
    });
  });

//dashboard page
router.get('/dashboard', ensureAuth, function(req, res) {
const items = Item.find({ user: req.user.id}).lean();
  res.render('dashboard', {
    name: req.user.firstName,
    items
  });
});



module.exports = router;