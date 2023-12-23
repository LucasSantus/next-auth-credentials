import { z } from "zod";

export const enviromentVariableSchema = z.object({
  // NEXT
  PORT: z.string().default("3000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // DATABASE
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),

  // NEXT AUTH
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url().default("http://localhost:3000"),

  // GOOGLE
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  //GITHUB
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),

  // RESEND
  RESEND_API_KEY: z.string(),
  RESEND_TO_EMAIL: z.string().default("onboarding@resend.dev"),
});

const enviromentVariableParsed = enviromentVariableSchema.safeParse(
  process.env,
);

if (!enviromentVariableParsed.success) {
  console.log("Oops, there was a problem loading the environment variables!");
  console.error(enviromentVariableParsed.error.issues);
  process.exit(1);
}

export const enviromentVariable = enviromentVariableParsed.data;
