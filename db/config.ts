import { NOW } from "astro:db";
import { defineDb, defineTable, column } from "astro:db";

export const Pets = defineTable({
  columns: {
    name: column.text(),
    species: column.text(),
  },
});

export const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    username: column.text({ unique: true }),
    password_hash: column.text(),
  },
});

export const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    user_id: column.text({ references: () => User.columns.id }),
    expires_at: column.number(),
  },
});

export const Comment = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    user_id: column.text({ references: () => User.columns.id }),
    text: column.text(),
    date: column.date({ default: NOW }),
  },
});

export default defineDb({ tables: { Pets, User, Session } });
