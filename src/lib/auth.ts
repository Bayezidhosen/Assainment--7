import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db, mongoClient } from "./mongodb";

export const auth = betterAuth({
  baseURL: "http://localhost:3000",

  database: mongodbAdapter(db, {
    client: mongoClient,
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});