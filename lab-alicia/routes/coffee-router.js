'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

const Coffee = require('../model/coffee.js');
const Roaster = require('../model/roaster.js');

const coffeeRouter = express.Router();

coffeeRouter.route('/coffees')
// GET all
    .get((req, res) => {
        Coffee.find()
            .then((coffees) => res.status(200).json(coffees))
            .catch(err => createError(404, err.message));
            })

// POST
    .post((req, res) => {
        new Coffee(req.body).save()
        .then((coffee) => res.status(200).json(coffee))
        .catch(err => res.send(createError(404, err.message)));
    });

coffeeRouter.route('/coffee/:id')
// GET one thing
    .get((req, res) => {
        Coffee.findbyId(req.params.id)
        // .populate('items')
            .then((coffee) => res.status(200).json(coffee))
            .catch(err => res.send(createError(404, err.message)));
    })

// PUT
    .put((req, res) => {
        let id = req.params.id;
        Coffee.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then((coffee) =>
            res.status(204).json(coffee))
        .catch(err => 
            res.send(createError(404, err.message)));
    })

    // DELETE
    .delete((req, res) => {
        Coffee.findByIdAndRemove(req.params.id)
            .then(() => {
                res.sendStatus(204)
            })
            .catch(err => {
                res.send(createError(500, err.message))
            });
    });

module.exports = coffeeRouter;