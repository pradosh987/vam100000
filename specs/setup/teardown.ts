import { knex } from "../../common/objection";

export default async function () {
  await knex.destroy();
}
