'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createError = require('http-errors');
const Coffee = require('./coffee.js');

const roasterSchema = Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    coffees: [{
        type: Schema.Types.ObjectId,
        ref: 'coffee'
    }]
});

const Roaster = mongoose.model('roaster', roasterSchema);

module.exports = Roaster;

Roaster.findByIdAndAddCoffee = (id, coffee) => {

    return Roaster.findById(id)
        .catch( err => Promise.reject(createError(404, err.message)))
        .then( roaster => {
            coffee.roasterID = roaster.id;
            this.tempRoaster = roaster;
            return new Coffee(coffee).save();
        })
        .then( coffee => {
            this.tempRoaster.coffees.push(coffee.id);
            this.tempCoffee = coffee;
            return this.tempRoaster.save();
        })
        .then(() => {
            return this.tempCoffee;
        })
};