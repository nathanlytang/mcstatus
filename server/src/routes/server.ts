export {};
const express = require('express');
const router = express.Router();
const status = require('../services/status');

router.get('/:id', async function(req, res, next) {
    const { id } = req.params;
    let api = await status.getStatus(id);
    console.log('serverapi: ', api)
    res.send(api);
});

module.exports = router;