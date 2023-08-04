import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

const connection = connect({
  host: process.env["VITE_DATABASE_HOST"],
  username: process.env["VITE_DATABASE_USERNAME"],
  password: process.env["VITE_DATABASE_PASSWORD"],
});

export const db = drizzle(connection);
