import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Tabel untuk menyimpan Master Account kamu
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Tabel untuk menyimpan daftar password sosmed/website kamu
export const passwords = sqliteTable('passwords', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  websiteName: text('website_name').notNull(),
  websiteUrl: text('website_url'),
  accountUsername: text('account_username').notNull(),
  accountPassword: text('account_password').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});