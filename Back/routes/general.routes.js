const express = require('express');

const requestRouter = require('./request/request.routes');
const authRouter = require('./Auth/auth.routes');
const workPlaceRouter = require('./workplace/workPlace.routes');
const authenticateToken = require('../middleware/auth.middleware');

const routes = express.Router();


routes.use("/auth",authRouter)
routes.use("/request" , authenticateToken ,requestRouter)
routes.use("/workPlace",workPlaceRouter)


module.exports = routes;
