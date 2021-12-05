import { middleware } from "../../common/express_base_middleware";
import { Patient } from "../../models/Patient";

export const index = middleware(async (req, res) => {
  const patients = await Patient.query();
  res.json({ data: patients });
});
