import { json } from "@sveltejs/kit";
import { db } from "$lib/db";
import { programs } from "$lib/db/schema";

export async function GET() {
  const data = await db.select().from(programs);

  return json(data);
}
