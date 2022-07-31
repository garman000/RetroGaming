export function up(knex) {
  return knex.schema.createTable("user_scores", function (table) {
    table.increments("id").primary();
    table.string("email").notNull();
    table.string("game").notNull();
    table.string("score").notNull();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.droptTable("user_scores");
}
