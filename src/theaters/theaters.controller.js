const theatersService = require("./theaters.service");

async function list(res){
  const result = await theatersService.list();
  console.log(result.theater_id);
  res.json({data: result});
}

module.exports = {
  list,
};