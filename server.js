// require modules
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);


//Rnv Vars
dotenv.config({ path: 'config/.env'});
require('./config/database');
require('./config/passport')(passport);


// Create the express app
const app = express();
app.use(express.urlencoded({ extended: true }));

//  Routes


//connect to db


// config app (app.set())
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// mount middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.json());
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
})
);
//session middleware
app.use(session({
    secret:'LetsGetIt',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());
// mount routes with app.use()
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/items', require('./routes/items'));

//Set global variable
app.use(function (req, res, next) {
  res.locals.user = req.user;
});


//listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express is listening on port:${port}`);
});

module.exports = app;