const router = require("express").Router();
const controller = require("./movies.controller");

router
.route("/:movieId/reviews")
.get(controller.reviewsForMovies)

router
.route("/:movieId/theaters")
.get(controller.theatersWhereMovieIsPlaying);

router
.route("/:movieId")
.get(controller.read)

router
.route("/")
.get(controller.list)

module.exports = router;