module.exports = ({ env }) => [
  'strapi::errors',
  {
    name: 'global::url-rewrite',
    config: {},
  },
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      // Add all your Vercel URLs here - both production and preview URLs
      origin: [
        env('FRONTEND_URL', 'https://front-end-livid-one.vercel.app'), // Production URL from env or default
        'https://front-end-git-main-ahmed-zakis-projects-1ad5a17d.vercel.app', // Preview URL from error
        ...(env('ALLOWED_ORIGINS', '').split(',').filter(Boolean)), // Additional origins from env variable (comma-separated)
        'https://backend-strapi-1-tcik.onrender.com',
        'http://localhost:5173',
        'http://localhost:3000',
        'http://localhost:5174',
        // Add more Vercel preview URLs as needed - they change with each deployment
        // Or set ALLOWED_ORIGINS env variable in Render: "url1,url2,url3"
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: [
        'Content-Type',
        'Authorization',
        'Origin',
        'Accept',
        'X-Requested-With',
      ],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '256mb',
      jsonLimit: '256mb',
      textLimit: '256mb',
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // 200MB
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
