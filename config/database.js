const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL ||'mongodb://localhost/users', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//shortcut for mongoose.connection obj
const db = mongoose.connection;
// db connect event
db.on('connected', function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
