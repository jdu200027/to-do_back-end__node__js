const express = require('express');
const infoRouter = express();

const InfoController = require('../controller/infoController');
const infoController = new InfoController();

const authRouter = require('../middleware/auth');
infoRouter.use(authRouter);

infoRouter.get('/getInfo', infoController.getInfo);
infoRouter.post('/postInfo', infoController.postInfo);
infoRouter.get('/getUserFromName/:name', infoController.getUserFromName)


module.exports = infoRouter;
