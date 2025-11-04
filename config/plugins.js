module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET', 'BA6/LPDxi1g37/KpZXcJNQ=='),
    },
  },
});