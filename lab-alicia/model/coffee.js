'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Roaster = require('./roaster.js');

mongoose.connect('mongodb://localhost/coffees');

const coffeeSchema = Schema ({
    origin: { type: String, required: true, unique: true },
    roast: { type: String, required: true },
    cost: { type: Number, required: true },
    roasterID: { type: Schema.Types.ObjectId, required: true }
});

const Coffee = mongoose.model('coffee', coffeeSchema);

module.exports = Coffee;