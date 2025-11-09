module.exports = ({ env }) => ({
  // 👇 Cloudinary upload provider
  upload: {
    config: {
      provider: '@strapi/provider-upload-cloudinary',
      providerOptions: {
        cloud_name: env('dzhcl678q'),
        api_key: env('831287848883921'),
        api_secret: env('wcToaj4erGImKZ8l96AgPn8_n4E'),
      },
    },
  },

  // 👇 Keep your existing users-permissions config
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET', 'BA6/LPDxi1g37/KpZXcJNQ=='),
    },
  },
});
