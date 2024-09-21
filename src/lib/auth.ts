import { Lucia } from "lucia";
// import { db, Pets } from "astro:db";
import { db } from "./db";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";

const adapter = new BetterSqlite3Adapter(db, {
  user: "user",
  session: "session",
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: import.meta.env.PROD,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
});

export interface DatabaseUser {
  id: string;
  username: string;
  password_hash: string;
}

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, "id">;
  }
}
