'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

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
