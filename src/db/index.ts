import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// Database akan disimpan di file bernama sqlite.db di root folder
const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite, { schema });