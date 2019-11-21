
exports.up = function(knex) {
    return Promise.all([
        knex.schema.table('favorites', function (table) {
            table.bigInteger('userId').references('id').inTable('users')
        })
    ])
};

exports.down = function(knex) {
  
};
