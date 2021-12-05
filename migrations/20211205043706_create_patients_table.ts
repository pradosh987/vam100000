import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("patients", (t) => {
    t.bigIncrements();
    t.enum("gender", ["MALE", "FEMALE", "OTHER"], {
      enumName: "genders",
      useNative: true,
    }).notNullable();
    t.integer("height_cm");
    t.integer("weight_kg");
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("patients");
}
