import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw("drop index patients_bmi_idx");
  await knex.schema.raw(
    "create index patients_bmi_idx on patients ((weight_kg / (height_cm^2  / 10000)))"
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw("drop index patients_bmi_idx");
  await knex.schema.raw(
    "create index patients_bmi_idx on patients (round(weight_kg / ((height_cm * height_cm):: float / 10000)::numeric, 2))"
  );
}
