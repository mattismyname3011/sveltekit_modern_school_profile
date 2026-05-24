import { db } from "$lib/db";
import { programs } from "$lib/db/schema";

export async function load() {
  const data = await db.select().from(programs);

  return {
    programs: data,
  };
}
