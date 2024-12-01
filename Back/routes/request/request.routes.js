
const express = require('express');
const { makeRequest, getUserRequests } = require('../../controllers/request/request.controller');

const requestRouter = express.Router();

requestRouter.post("/",makeRequest)
requestRouter.get('/user/:userId/requests', getUserRequests);




module.exports = requestRouter;
