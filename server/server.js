const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
//import pool for database query
const pool = require('./modules/pool');

//routers
const restaurantRouter = require('./routes/restaurant.router');
const googleSearchRouter = require('./routes/googleSearch.router');
/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));


/** ---------- ROUTES ---------- **/
app.use('/api/restaurants', restaurantRouter);
app.use('/api/googleSearch', googleSearchRouter);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});