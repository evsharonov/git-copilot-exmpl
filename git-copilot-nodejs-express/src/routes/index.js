function setRoutes(app) {
    const IndexController = require('../controllers/index').IndexController;
    const indexController = new IndexController();

    app.get('/', indexController.getIndex.bind(indexController));
}

module.exports = setRoutes;