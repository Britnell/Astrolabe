import { db } from "../../../lib/db";
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const text = formData.get("text");

  if (!context.locals.session || !context.locals.user)
    return new Response(null, {
      status: 401,
      headers: { Location: "/lucia/login" },
    });

  console.log({ text }, context.locals);

  const resp = db
    .prepare("INSERT INTO Comment (user_id, text) VALUES (?, ?)")
    .run(context.locals.user.id, text);
  console.log({ resp });

  return new Response("", {
    status: 302,
    headers: { Location: "/lucia/profile" },
  });
}
