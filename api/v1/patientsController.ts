import { middleware } from "../../common/express_base_middleware";
import { Patient } from "../../models/Patient";
import { knex } from "../../common/objection";
import { snakeCaseMappers } from "objection";
import createHttpError from "http-errors";
import { BMICategory } from "../../models/BMICategory";

const { parse } = snakeCaseMappers();

const MAX_PAGE_SIZE = 20;
export const index = middleware(async (req, res) => {
  const page = Number(req.query.page) || 1;
  let pageSize = Number(req.query.pageSize) || 10;
  if (pageSize > MAX_PAGE_SIZE) {
    pageSize = MAX_PAGE_SIZE;
  }

  const { rows } = await knex.raw(
    `
            select *, count(*) over () as total_count
            from patients
            offset :offset limit :pageSize
        `,
    { pageSize, offset: (page - 1) * pageSize }
  );

  if (rows.length === 0) {
    throw createHttpError(404, "No patients found");
  }
  const totalCount = rows[0].total_count;
  const patients = rows.map((row: any) => {
    row.total_count = undefined;
    return Patient.fromDatabaseJson(parse(row)) as Patient;
  });
  res.json({ data: patients, totalCount, page, pageSize });
});

export const get = middleware(async (req, res) => {
  const patientId = Number(req.params.patientId);
  if (Number.isNaN(patientId)) {
    throw createHttpError(400, "Invalid patient id");
  }
  const { rows } = await Patient.knex().raw(
    `
            with pets as (select p.*,
                                 round(p.weight_kg / ((p.height_cm * p.height_cm):: float / 10000)::numeric, 2) as bmi
                          from patients p
                          where p.id = :patientId)
            select p.*, bc.category, bc.health_risk
            from pets p
                     join bmi_categories bc
                          on p.bmi >= bc.lower_bmi_range and p.bmi < bc.upper_bmi_range
        `,
    { patientId }
  );

  if (rows.length === 0) {
    throw createHttpError(404, "Patient not found");
  }

  if (rows.length > 1) {
    throw createHttpError(500, "Multiple patients found");
  }
  const patient = Patient.fromDatabaseJson(parse(rows[0]));
  res.json({ data: patient });
});

export const count = middleware(async (req, res) => {
  const category = req.query.category?.toString();
  if (!category?.length) {
    throw createHttpError(400, "Invalid category");
  }

  const { lowerBmiRange, upperBmiRange } = await BMICategory.query()
    .findOne({})
    .whereRaw("lower(category) = lower(:category)", { category })
    .select(["lowerBmiRange", "upperBmiRange"])
    .limit(1)
    .throwIfNotFound();

  const {
    rows: [{ count }],
  } = await knex.raw(
    `
            select count(*)
            from patients p
            where round(p.weight_kg / ((p.height_cm * p.height_cm):: float / 10000)::numeric, 2) >= :lowerBmiRange
              and round(p.weight_kg / ((p.height_cm * p.height_cm):: float / 10000)::numeric, 2) < :upperBmiRange
        `,
    { lowerBmiRange, upperBmiRange }
  );
  return res.json({ data: count });
});
