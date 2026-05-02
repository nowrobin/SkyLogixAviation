import { PrismaClient } from "./src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  const fleet = await (prisma as any).aircraft.findMany({
    select: { id: true, name: true },
  });
  console.log("Current fleet:", JSON.stringify(fleet, null, 2));

  const testId = process.argv[2];
  if (testId) {
    console.log(`\nAttempting to delete: ${testId}`);
    try {
      await (prisma as any).aircraft.delete({ where: { id: testId } });
      console.log("Deleted successfully");
    } catch (e: any) {
      console.error("Delete error:", e.message, "Code:", e.code);
    }
  }
}

main().finally(() => (prisma as any).$disconnect());
