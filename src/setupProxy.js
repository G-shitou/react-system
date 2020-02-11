const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: 'https://www.fastmock.site/mock/42c8dcae90dc8179c2859cdfdcb875de/',
      changeOrigin: true
    })
  );
};