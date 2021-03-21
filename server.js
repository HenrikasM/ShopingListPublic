const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

//const items = require('./routes/api/items');

const app =  express();

//body parser 
app.use(express.json());

// DB config
const db = config.get('mongoURI');

mongoose.connect(db, {useCreateIndex:true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//user routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

//static assets

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
   
    app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
