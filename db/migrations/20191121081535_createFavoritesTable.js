exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('favorites', function(table) {
            table.increments('id').primary();
            table.string('location');

            table.timestamps(true, true);
        })
    ])
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('favorites'),
    ]);
}