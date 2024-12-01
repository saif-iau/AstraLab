const express = require('express');
const { createWorkplace, getWorkPlaces, updateWorkplace } = require('../../controllers/workplace/workPlace.controller');


const workPlaceRouter = express.Router();

workPlaceRouter.post("/",createWorkplace)
workPlaceRouter.get("/",getWorkPlaces)
workPlaceRouter.patch("/",updateWorkplace)




module.exports = workPlaceRouter;
