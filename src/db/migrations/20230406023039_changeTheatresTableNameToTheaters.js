exports.up = function (knex) {
    return knex.schema.renameTable("theatres", "theaters");
    
  };

  exports.down = function (knex) {
    return knex.schema.renameTable("theatres", "theaters");
      
   
  };