import { knex } from "../../common/objection";
import { truncateDatabase } from "./helpers";
import seed from "./seed";

beforeEach(async () => {
  await truncateDatabase();
  await seed();
});

afterAll(() => knex.destroy());
