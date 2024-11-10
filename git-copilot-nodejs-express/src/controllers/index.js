class IndexController {
    getIndex(req, res) {
        res.send('Welcome to the Node.js Express App!');
    }
}

module.exports = IndexController;