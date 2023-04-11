const moviesTheatersService = require("./movies_theaters.service");

async function list(res){
  const result = await moviesTheatersService.list()
  console.log(result[0]);
  res.json({data: result});
} 
module.exports = {
  list,
};