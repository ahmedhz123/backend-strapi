'use strict';

/**
 * product router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::product.product');

// Add custom routes for /api/products (plural) to match frontend expectations
const customRoutes = [
  {
    method: 'GET',
    path: '/products',
    handler: 'api::product.product.find',
    config: {
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'GET',
    path: '/products/:id',
    handler: 'api::product.product.findOne',
    config: {
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'POST',
    path: '/products',
    handler: 'api::product.product.create',
    config: {
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'PUT',
    path: '/products/:id',
    handler: 'api::product.product.update',
    config: {
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'DELETE',
    path: '/products/:id',
    handler: 'api::product.product.delete',
    config: {
      policies: [],
      middlewares: [],
    },
  },
];

// Merge default routes with custom routes
// createCoreRouter returns { routes: [...] }, so we need to spread both
module.exports = {
  routes: [
    ...(defaultRouter.routes || []),
    ...customRoutes,
  ],
};
