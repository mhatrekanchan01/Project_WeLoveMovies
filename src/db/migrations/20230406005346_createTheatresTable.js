
exports.up = function(knex) {
    return knex.schema.createTable("theatres", (table) => {
  
      table.increments("theatre_id").primary(); // Sets critic_id as the primary key
      table.string("name");
      table.string("address_line_1");
      table.string("address_line_2");
      table.string("city");
      table.string("state");
      table.string("zip");
      table.timestamps(true, true);
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable("theatres");
  };
  