const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();


const pool = require('../modules/pool');

// router.get('/map', (req, res) => {
//     axios(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&callback=initMap`)
//         .then(response => {
//             console.log(response.data);
//             res.send(response.data);
//         })
// })

router.get('/', (req, res) => {
    axios({
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat},${req.query.lng}&radius=1000&type=restaurant&keyword=${req.query.restaurant}`,
        // url:`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.query.restaurant}&inputtype=textquery&fields=photos,formatted_address,name,type`,
        params: {
            key: process.env.REACT_APP_GOOGLE_KEY,
        }
    })
        .then(
            response => {
                console.log(response.data.results);
                res.send(response.data.results);
            }
        ).catch(error => {
            console.log('error with google search', error);
            res.sendStatus(500);
        })
})

module.exports =router;