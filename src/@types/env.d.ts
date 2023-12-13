declare namespace NodeJS {
  interface ProcessEnv {
    // DATABASE
    DATABASE_URL: string;
    DIRECT_URL: string;

    // NEXT AUTH
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;

    // GOOGLE
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;

    //GITHUB
    GITHUB_ID: string;
    GITHUB_SECRET: string;

    // RESEND
    RESEND_API_KEY: string;
  }
}
