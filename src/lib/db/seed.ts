import { db } from "./index";
import { programs as programsTable } from "./schema";
import { programs } from "$lib/data/programs";

async function seed() {
  console.log("Seeding database...");

  await db.insert(programsTable).values(programs);

  console.log("Database seeded successfully");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
