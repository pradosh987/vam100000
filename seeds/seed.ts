import { Knex } from "knex";
import fs from "fs-extra";
import path from "path";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("bmi_categories").del();
  await knex("patients").del();

  // Inserts seed entries
  await knex("bmi_categories").insert([
    {
      lower_bmi_range: 0,
      upper_bmi_range: 18.5,
      category: "Underweight",
      health_risk: "Malnutrition risk",
    },
    {
      lower_bmi_range: 18.5,
      upper_bmi_range: 25,
      category: "Normal weight",
      health_risk: "Low risk",
    },
    {
      lower_bmi_range: 25,
      upper_bmi_range: 30,
      category: "Overweight",
      health_risk: "Enhanced risk",
    },
    {
      lower_bmi_range: 30,
      upper_bmi_range: 35,
      category: "Moderately obese",
      health_risk: "Medium risk",
    },
    {
      lower_bmi_range: 35,
      upper_bmi_range: 40,
      category: "Severely obese",
      health_risk: "High risk",
    },
    {
      lower_bmi_range: 40,
      upper_bmi_range: 100,
      category: "Very severely obese",
      health_risk: "Very high risk",
    },
  ]);

  const patientsData = (await fs
    .readFile(path.join(__dirname, "patients.json"), "utf8")
    .then(JSON.parse)) as unknown as any[];
  console.log({ patientsData });
  await knex("patients").insert(
    patientsData.map((p) => ({
      gender: p.Gender.toUpperCase(),
      height_cm: p.HeightCm,
      weight_kg: p.WeightKg,
    }))
  );
}
