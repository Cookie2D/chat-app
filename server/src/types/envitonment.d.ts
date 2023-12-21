declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      BCRYPT_SALT: string;
      JWT_SECRET: string;
      JWT_EXPIRES: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_SECRET: string;
    }
  }
}

export {};
