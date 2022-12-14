import { connection } from "../../database";

export interface Company {
  id: number;
  name: string;
  apiKey?: string;
}

export async function findByApiKey(apiKey: string) {
  const result = await connection.query<Company, [string]>(
    `SELECT * FROM companies WHERE "apiKey"=${apiKey}`//, [apiKey]
  );
  
  return result.rows[0];
}
