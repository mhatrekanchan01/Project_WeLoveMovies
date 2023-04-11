const moviesService = require("./movies.service");

async function list(req, res, next) {
  if (req.query.is_showing) {
    const { is_showing } = req.query;
    console.log(is_showing);
    is_showing === "true"
        ? res.status(200).json({ data: await moviesService.listShowing() })
        : next({ status: 404, message: "Search method not allowed" });
      } else {
        const data = await moviesService.list();
        res.status(200).json({ data });
      }
}

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function read(req, res, next){
  const { movie: data } = res.locals;
  console.log({ movie: data });
  res.json({ data });
}

async function theatersWhereMovieIsPlaying(req, res, next){
  console.log(res.locals.movie.movie_id);
  const found = await moviesService.theatersWhereMovieIsPlaying(res.locals.movie.movie_id);
  console.log(found);
  res.json({data: found});
}

async function reviewsForMovies(req, res, next){
  console.log(res.locals.movie.movie_id);
  const found = await moviesService.reviewsForMovies(res.locals.movie.movie_id);
  console.log(found);
  res.json({data: found});
}

module.exports = {
  list,
  read: [movieExists, read],
  theatersWhereMovieIsPlaying: [movieExists, theatersWhereMovieIsPlaying],
  reviewsForMovies: [movieExists, reviewsForMovies]
};