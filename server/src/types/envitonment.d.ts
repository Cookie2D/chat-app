declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      BCRYPT_SALT: string;
      JWT_SECRET: string;
      JWT_EXPIRES: string;
    }
  }
}

export {};
