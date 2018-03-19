'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

const Coffee = require('../model/coffee.js');
const Roaster = require('../model/roaster.js');

const roasterRouter = express.Router();

roasterRouter.route('/roasters')
// GET all
    .get((req, res) => {
        Roaster.find()
            .then((roasters) => res.status(200).json(roasters))
            .catch(err => createError(404, err.message));
            })

// POST
    .post((req, res) => {
        new Roaster(req.body).save()
        .then((roaster) => res.status(200).json(roaster))
        .catch(err => res.send(createError(404, err.message)));
    });

roasterRouter.route('/roaster/:id')
// GET one thing
    .get((req, res) => {
        Roaster.findbyId(req.params.id)
        // .populate('items')
            .then((roaster) => res.status(200).json(roaster))
            .catch(err => res.send(createError(404, err.message)));
    })

// PUT
    .put((req, res) => {
        let id = req.params.id;
        Roaster.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then((roaster) =>
            res.status(204).json(roaster))
        .catch(err => 
            res.send(createError(404, err.message)));
    })

    // DELETE
    .delete((req, res) => {
        Roaster.findByIdAndRemove(req.params.id)
            .then(() => {
                res.sendStatus(204)
            })
            .catch(err => {
                res.send(createError(500, err.message))
            });
    });

module.exports = roasterRouter;