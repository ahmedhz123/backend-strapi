// config/server.js
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1377),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('PUBLIC_URL', 'https://backend-strapi-1-tcik.onrender.com'),
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  // Add timeout settings to prevent ETIMEDOUT errors
  proxy: true,
  cron: {
    enabled: false,
  },
  // HTTP server timeout settings (in milliseconds)
  timeout: 60000, // 60 seconds for HTTP requests
  // Keep-alive timeout
  keepAliveTimeout: 65000, // 65 seconds
  // Headers timeout
  headersTimeout: 66000, // 66 seconds
});
