import { knex } from "../../common/objection";
import { truncateDatabase } from "./helpers";
import fs from "fs-extra";
import path from "path";

const seed = async () => {
  await truncateDatabase();
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

  const patientsData = [
    {
      Gender: "Male",
      HeightCm: 171,
      WeightKg: 96,
    },
    {
      Gender: "Male",
      HeightCm: 161,
      WeightKg: 85,
    },
    {
      Gender: "Male",
      HeightCm: 180,
      WeightKg: 77,
    },
    {
      Gender: "Female",
      HeightCm: 166,
      WeightKg: 62,
    },
    {
      Gender: "Female",
      HeightCm: 150,
      WeightKg: 70,
    },
    {
      Gender: "Female",
      HeightCm: 167,
      WeightKg: 82,
    },
  ];

  await knex("patients").insert(
    [...patientsData, ...patientsData, ...patientsData, ...patientsData].map(
      (p) => ({
        gender: p.Gender.toUpperCase(),
        height_cm: p.HeightCm,
        weight_kg: p.WeightKg,
      })
    )
  );
};

export default seed;
