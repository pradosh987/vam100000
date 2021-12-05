import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.raw(
    "create index patients_bmi_idx on patients (round(weight_kg / ((height_cm * height_cm):: float / 10000)::numeric, 2))"
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw("drop index patients_bmi_idx");
}
