'use strict';

/**
 * URL rewrite middleware
 * Rewrites /api/products to /api/product to match Strapi's default route structure
 */
module.exports = () => {
  return async (ctx, next) => {
    // Rewrite /api/products to /api/product
    if (ctx.url && ctx.url.startsWith('/api/products')) {
      const originalUrl = ctx.url;
      
      // Rewrite the URL
      ctx.url = ctx.url.replace('/api/products', '/api/product');
      
      // Also update request properties
      if (ctx.request) {
        ctx.request.url = ctx.url;
        if (ctx.request.path) {
          ctx.request.path = ctx.request.path.replace('/api/products', '/api/product');
        }
      }
      
      // Update path property
      if (ctx.path) {
        ctx.path = ctx.path.replace('/api/products', '/api/product');
      }
      
      // Update originalUrl for logging
      if (ctx.originalUrl) {
        ctx.originalUrl = ctx.originalUrl.replace('/api/products', '/api/product');
      }
    }
    
    await next();
  };
};

