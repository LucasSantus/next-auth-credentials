declare namespace NodeJS {
  interface ProcessEnv {
    // DATABASE
    DATABASE_URL: string;
    DIRECT_URL: string;

    // NEXT AUTH
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;

    // RESEND
    RESEND_API_KEY: string;
  }
}
