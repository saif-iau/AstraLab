const express = require('express');

const requestRouter = require('./request/request.routes');
const authRouter = require('./Auth/auth.routes');
const workPlaceRouter = require('./workplace/workPlace.routes');
const authenticateToken = require('../middleware/auth.middleware');
const emailRouter = require('./email/email.routes');

const routes = express.Router();


routes.use("/auth",authRouter)
routes.use("/request" , authenticateToken ,requestRouter)
routes.use("/workPlace",workPlaceRouter)
routes.use("/email",emailRouter)



module.exports = routes;
