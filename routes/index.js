// loading router, api-routes, and html-routes
const router = require('express').Router();
const api_routes = require('./api-routes.js');
const html_routes = require('./html-routes.js');

// allowing app to handle requests from both '/' and '/api'
router.use('/', html_routes);
router.use('/api', api_routes);

// exporting router as a module
module.exports = router;