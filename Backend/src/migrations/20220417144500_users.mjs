export function up(knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("first_name").notNull();
    table.string("last_name").notNull();
    table.string("nickname").unique().notNull();
    table.string("email").unique().notNull();
    table.string("password").notNull();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.droptTable("users");
}
