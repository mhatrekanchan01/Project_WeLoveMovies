if (process.env.USER) require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const jsonParser = bodyParser.json();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const cors = require('cors');


// router.use(cors())
app.use(cors())
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", jsonParser, reviewsRouter);

// Not found handler
app.use((req, res, next) => {
    next({ status: 404, message: `Not found: ${req.originalUrl}` });
  });
  
  // Error handler
  app.use((error, req, res, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
  });

module.exports = app;
