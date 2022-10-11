import pgk from "pg"
const  { Pool } = pgk



export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgre',
    port: 5432,
  })