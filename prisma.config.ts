import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // @ts-ignore: Next.js types omit Node process globals in this scope
    url: process.env.DATABASE_URL || "",
  },
});