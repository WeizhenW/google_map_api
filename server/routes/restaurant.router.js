const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');
//route to get all restaurants
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "restaurant"`)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error with get all restaurants', error);
            res.sendStatus(500);
        })
})

//route to get one restaurant
router.get('/:id', (req, res) => {
    pool.query(`SELECT * FROM "restaurant" WHERE "id"=$1;`, [req.params.id])
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('error with get one restaurant', error);
            res.sendStatus(500);
        })
})




module.exports =router;