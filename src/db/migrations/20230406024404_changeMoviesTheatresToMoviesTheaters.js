exports.up = function (knex) {
    return knex.schema.renameTable("movies_theatres", "movies_theaters");
    
  };

  exports.down = function (knex) {
    return knex.schema.renameTable("movies_theatres", "movies_theaters");
      
   
  };