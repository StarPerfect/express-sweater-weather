exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('users', function(table) {
            table.increments('id').primary();
            table.string('username');
            table.string('name');
            table.string('apiKey');

            table.timestamps(true, true);
        })
    ])
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('users'),
    ]);
}