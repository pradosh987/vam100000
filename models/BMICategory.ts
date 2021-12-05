import { Model } from "objection";

export class BMICategory extends Model {
  static tableName = "bmi_categories";

  id: number;
  lowerBmiRange: number;
  upperBmiRange: number;
  category: string;
  healthRisk: string;
}
