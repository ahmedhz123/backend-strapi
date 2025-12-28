'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    // Add custom middleware for better error handling and logging
    strapi.server.use(async (ctx, next) => {
      const start = Date.now();
      
      try {
        await next();
        
        // Log successful requests (only in development or for errors)
        if (process.env.NODE_ENV === 'development' || ctx.status >= 400) {
          const duration = Date.now() - start;
          strapi.log.debug(
            `${ctx.method} ${ctx.url} - ${ctx.status} - ${duration}ms`
          );
        }
      } catch (error) {
        const duration = Date.now() - start;
        strapi.log.error(
          `Error in ${ctx.method} ${ctx.url} - ${error.message} - ${duration}ms`
        );
        
        // Ensure proper error response format
        if (!ctx.body) {
          ctx.status = error.status || 500;
          ctx.body = {
            error: {
              status: ctx.status,
              message: error.message || 'Internal Server Error',
            },
          };
        }
        
        throw error;
      }
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // Log successful bootstrap
    strapi.log.info('Strapi application started successfully');
    strapi.log.info(`Server URL: ${strapi.config.get('server.url')}`);
    strapi.log.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  },
};
