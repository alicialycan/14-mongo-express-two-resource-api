'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Roaster = require('./roaster.js');

mongoose.connect('mongodb://localhost/coffees');

const coffeeSchema = new Schema ({
    origin: { type: String, required: true, unique: true },
    roast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'roaster' }],
    cost: { type: Number, required: true },
});

const Coffee = mongoose.model('coffee', coffeeSchema);

module.exports = Coffee;