exports.up = function (knex) {
    return knex.schema.table("theaters", (table) => {

        table.renameColumn("theatre_id", "theater_id");
    })
    
    
    
  };

  exports.down = function (knex) {
    return knex.schema.table("theaters", (table) => {

        table.renameColumn("theatre_id", "theater_id");
    })
      
   
  };