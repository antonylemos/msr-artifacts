// src/db/sqlClient.js
import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL not set!");
const sql = postgres(DATABASE_URL, { /* options */ });
export default sql;