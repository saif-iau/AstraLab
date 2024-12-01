
const express = require('express');
const { register, login, refreshToken } = require('../../controllers/auth/auth.controller');


const authRouter = express.Router();

authRouter.post("/register" , register)
authRouter.post("/login" , login)
authRouter.post("/refreshToken" , refreshToken)


module.exports = authRouter;
