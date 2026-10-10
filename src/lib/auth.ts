
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.BETTER_AUTH_MONGODB;

if (!mongoUrl) {
  throw new Error("BETTER_AUTH_MONGODB is missing");
}

const client = new MongoClient(mongoUrl);
const db = client.db("bazar-dor");

const baseURL =
  process.env.BETTER_AUTH_URL || "http://localhost:3000";

const trustedOrigins = [
  "http://localhost:3000",
  ...(process.env.BETTER_AUTH_URL
    ? [new URL(process.env.BETTER_AUTH_URL).origin]
    : []),
];

export const auth = betterAuth({
  baseURL,
  trustedOrigins,

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
