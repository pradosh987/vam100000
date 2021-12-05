import { Model } from "objection";
import { Gender } from "../enums/gender";

export class Patient extends Model {
  static tableName = "patients";

  id: number;
  heightCm: number;
  weightKg: number;
  gender: Gender;
  createdAt: string;
  updatedAt: string;
}
