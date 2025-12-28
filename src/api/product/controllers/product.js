'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  async find(ctx) {
    try {
      const { data, meta } = await super.find(ctx);
      
      // Ensure data is always an array
      const safeData = Array.isArray(data) ? data : [];
      
      // Transform and validate each product
      const transformedData = safeData.map((item) => {
        const product = item.attributes || item;
        
        // Ensure productImg is always an array
        let productImg = [];
        if (product.productImg) {
          const imgData = product.productImg;
          if (imgData.data) {
            const imgArray = Array.isArray(imgData.data) ? imgData.data : [imgData.data];
            productImg = imgArray
              .map((img) => {
                const url = img?.attributes?.url || img?.url || '';
                return url ? { url } : null;
              })
              .filter((img) => img !== null);
          } else if (Array.isArray(imgData)) {
            productImg = imgData
              .map((img) => {
                const url = img?.attributes?.url || img?.url || '';
                return url ? { url } : null;
              })
              .filter((img) => img !== null);
          }
        }
        
        return {
          id: item.id,
          ...product,
          productImg: productImg.length > 0 ? productImg : [],
        };
      });
      
      return {
        data: transformedData,
        meta,
      };
    } catch (error) {
      strapi.log.error('Error in product.find:', error);
      ctx.throw(500, 'Failed to fetch products');
    }
  },
  
  async findOne(ctx) {
    try {
      const { data, meta } = await super.findOne(ctx);
      
      if (!data) {
        return ctx.notFound('Product not found');
      }
      
      // Transform and validate the product
      const product = data.attributes || data;
      
      // Ensure productImg is always an array
      let productImg = [];
      if (product.productImg) {
        const imgData = product.productImg;
        if (imgData.data) {
          const imgArray = Array.isArray(imgData.data) ? imgData.data : [imgData.data];
          productImg = imgArray
            .map((img) => {
              const url = img?.attributes?.url || img?.url || '';
              return url ? { url } : null;
            })
            .filter((img) => img !== null);
        } else if (Array.isArray(imgData)) {
          productImg = imgData
            .map((img) => {
              const url = img?.attributes?.url || img?.url || '';
              return url ? { url } : null;
            })
            .filter((img) => img !== null);
        }
      }
      
      return {
        data: {
          id: data.id,
          ...product,
          productImg: productImg.length > 0 ? productImg : [],
        },
        meta,
      };
    } catch (error) {
      strapi.log.error('Error in product.findOne:', error);
      ctx.throw(500, 'Failed to fetch product');
    }
  },
}));
