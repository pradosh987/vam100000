import { Transaction } from "objection";
import { knex } from "../../common/objection";

export const getTables = async (trx: Transaction): Promise<string[]> => {
  return trx
    .raw(
      `SELECT table_name, table_type
             FROM information_schema.tables
             WHERE table_schema = 'public'
               AND table_type = 'BASE TABLE';`
    )
    .then((res) => res.rows.map((row: any) => row.table_name));
};

export const truncateTable = (trx: Transaction, table: string) => {
  return trx.raw(`TRUNCATE TABLE ${table} CASCADE;`);
};

export const truncateDatabase = async (): Promise<void> => {
  return knex.transaction(async (trx) => {
    const tables = await getTables(trx);
    await Promise.all(tables.map((t) => truncateTable(trx, t)));
  });
};
