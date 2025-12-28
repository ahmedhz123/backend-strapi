module.exports = ({ env }) => ({
  connection: {
    client: env('DATABASE_CLIENT', 'postgres'),
    connection: {
      host: env('DATABASE_HOST'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME'),
      user: env('DATABASE_USERNAME'),
      password: env('DATABASE_PASSWORD'),
      ssl: {
        rejectUnauthorized: false,
      },
      // Connection timeout in milliseconds (30 seconds)
      connectionTimeoutMillis: 30000,
    },
    // Pool configuration for Knex.js (Strapi uses Knex)
    pool: {
      min: 2,
      max: 10,
      // Time to wait before timing out when acquiring a connection (30 seconds)
      acquireTimeoutMillis: 30000,
      // Time to wait before timing out when creating a connection (30 seconds)
      createTimeoutMillis: 30000,
      // Time a connection can sit idle before being recycled (10 minutes)
      idleTimeoutMillis: 600000,
      // How often to check for idle connections (1 second)
      reapIntervalMillis: 1000,
      // How long to wait before retrying to create a connection (100ms)
      createRetryIntervalMillis: 100,
    },
    debug: false,
  },
});
