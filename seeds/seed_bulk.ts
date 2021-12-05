import { Knex } from "knex";
import _ from "lodash";
import { Gender } from "../enums/gender";
export async function seed(knex: Knex): Promise<void> {
  const genders = Object.values(Gender);
  for (let i = 0; i < 1000; i++) {
    const patients = [];
    for (let j = 0; j < 1000; j++) {
      patients.push({
        gender: _.shuffle(genders)[0],
        height_cm: _.random(150, 190),
        weight_kg: _.random(50, 120),
      });
    }
    await knex("patients").insert(patients);
  }
}
