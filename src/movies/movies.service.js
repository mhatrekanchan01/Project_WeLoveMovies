const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
  return knex("movies").select("*");
}

function listShowing() {
  return knex("movies as m")
  .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
  .where({ "mt.is_showing": true })
  .distinct("m.*");
}
  
  /*function read(movie_id){
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({"mt.is_showing": true})
  }*/

function read(movieId){
  return knex("movies")
  .select("*")
  .where({"movie_id": movieId})
  .first();
}

function theatersWhereMovieIsPlaying(movie_id){
  return knex("movies as m")
  .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
  .join("theaters as t", "mt.theater_id", "t.theater_id")
  .select("t.*")
  .where({ "mt.movie_id": movie_id })
}

const addCategory = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
})

function reviewsForMovies(movie_id){
  return knex("movies as m")
  .join("reviews as r", "r.movie_id", "m.movie_id")
  .join("critics as c", "c.critic_id", "r.critic_id")
  .select("r.*", "c.*")
  .where({ "r.movie_id": movie_id })
  .then((response) => {
    return response.map((eachResponse) => addCategory(eachResponse));
});

}

module.exports = {
  list,
  listShowing,
  read,
  theatersWhereMovieIsPlaying,
  reviewsForMovies
};