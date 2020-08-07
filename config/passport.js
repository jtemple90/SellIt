
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function(passport) {
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
function(accessToken, refreshToken, profile, cb) {
User.findOne({ 'googleId': profile.id}, function(err, user) {
    if (err) return cb(err);
    if (user) {
        return cb(null, user);
    } else {
        //new user via Oath
        const newUser = new User({
            displayName: profile.displayName,
            googleId: profile.id,
            firstName: profile.name.givenName,
            image: profile.photos[0].value
        });
        newUser.save(function(err) {
            if (err) return cb(err);
            return cb(null, newUser);
                 });
    }
});
}));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
};
