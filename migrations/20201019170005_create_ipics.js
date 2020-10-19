exports.up = function(knex) {
    return knex.schema.createTable("ipics", function (table) {
        table.increments('id');
        table.string("name");
        table.string("group");
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable("ipics");
  };