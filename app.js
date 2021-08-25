const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth/authRout');

const app = express();
app.use(express.json());
app.use('/api/user', authRouter)

mongoose.connect('mongodb://irb1s:2205@localhost:27017/', {useUnifiedTopology: true, useNewUrlParser: true}, function (err) {
    if (err) return console.log(err);
    app.listen(3000, function () {
        console.log("Server start...");
    });
});
