'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const coffeeRouter = require('./routes/coffee-router.js');
const roasterRouter = require('./routes/roaster-router.js');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/coffees');


const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', coffeeRouter);
app.use('/api', roasterRouter);

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});