import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("bmi_categories", (t) => {
    t.increments();
    t.float("lower_bmi_range").notNullable();
    t.float("upper_bmi_range").notNullable();
    t.string("category").notNullable();
    t.string("health_risk").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("bmi_categories");
}
