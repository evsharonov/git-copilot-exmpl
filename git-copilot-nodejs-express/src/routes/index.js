const express = require('express');
const IndexController = require('../controllers/index');
const tablesRoutes = require('./tables');

function setRoutes(app) {
    const indexController = new IndexController();

    app.get('/', indexController.getIndex.bind(indexController));
    app.use('/api', tablesRoutes); // Add this line to include table routes
}

module.exports = setRoutes;