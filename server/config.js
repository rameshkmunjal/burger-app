import dotenv from "dotenv";
dotenv.config(); // Load .env into process.env

// Helper to check required env variables
function requireEnv(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return value;
}

export const config = {
  db: {
    uri: requireEnv("MONGO_URI"), // app will throw if missing
  },
  server: {
    port: process.env.PORT || 5000,
  },
  flags: {
    runImport: process.env.RUN_IMPORT === "true",
  },
};
