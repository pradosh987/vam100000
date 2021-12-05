import { knex } from "../../common/objection";
import { truncateDatabase } from "./helpers";

const seed = async () => {
  await truncateDatabase();
};

export default seed;
