import 'dotenv/config'
import postgres from 'postgres'

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const URL = `postgres://${PGHOST}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3d${ENDPOINT_ID}`

export const sql = postgres(URL, { ssl: "require"})