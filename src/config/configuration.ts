export default () => ({
  APP_URL:
    process.env.DEV_APP_URL ??
    process.env.STAGING_APP_URL ??
    process.env.PROD_APP_URL,
  database: {
    URI: process.env.DATABASE_URI,
  },
});
