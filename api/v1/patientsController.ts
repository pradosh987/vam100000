import { middleware } from "../../common/express_base_middleware";
import { Patient } from "../../models/Patient";
import { knex } from "../../common/objection";
import { snakeCaseMappers } from "objection";
import createHttpError from "http-errors";

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
