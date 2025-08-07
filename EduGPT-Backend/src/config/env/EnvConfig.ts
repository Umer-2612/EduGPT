import dotenv from "dotenv";
import { z } from "zod";

export class EnvConfig {
  public readonly NODE_ENV: "development" | "production" | "test";
  public readonly PORT: number;
  public readonly DATABASE_URL: string;
  public readonly DATABASE_USERNAME: string;
  public readonly DATABASE_PASS: string;
  public readonly DATABASE_NAME: string;
  public readonly AWS_REGION: string;
  public readonly S3_BUCKET_NAME: string;
  public readonly AWS_ACCESS_KEY_ID: string;
  public readonly AWS_SECRET_ACCESS_KEY: string;

  constructor() {
    dotenv.config();

    const schema = z.object({
      NODE_ENV: z.enum(["development", "production", "test"]),
      PORT: z.string().default("3000").transform(Number),
      DATABASE_URL: z.string(),
      DATABASE_USERNAME: z.string(),
      DATABASE_PASS: z.string(),
      DATABASE_NAME: z.string(),
      AWS_REGION: z.string(),
      S3_BUCKET_NAME: z.string(),
      AWS_ACCESS_KEY_ID: z.string(),
      AWS_SECRET_ACCESS_KEY: z.string(),
    });

    const result = schema.safeParse(process.env);
    if (!result.success) {
      console.error(
        "Invalid environment variables:",
        JSON.stringify(result.error.issues, null, 2)
      );
      process.exit(1);
    }

    const parsed = result.data;
    this.NODE_ENV = parsed.NODE_ENV;
    this.PORT = parsed.PORT;
    this.DATABASE_URL = parsed.DATABASE_URL;
    this.DATABASE_USERNAME = parsed.DATABASE_USERNAME;
    this.DATABASE_PASS = parsed.DATABASE_PASS;
    this.DATABASE_NAME = parsed.DATABASE_NAME;
    this.AWS_REGION = parsed.AWS_REGION;
    this.S3_BUCKET_NAME = parsed.S3_BUCKET_NAME;
    this.AWS_ACCESS_KEY_ID = parsed.AWS_ACCESS_KEY_ID;
    this.AWS_SECRET_ACCESS_KEY = parsed.AWS_SECRET_ACCESS_KEY;
  }
}
