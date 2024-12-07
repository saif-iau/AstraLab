const jwt = require('jsonwebtoken');

const generateTokens = (userId, rememberMe) => {
  console.log(userId , rememberMe)
  const accessTokenSecret = process.env.JWT_ACCESS_SECRET;
  const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

  if (!accessTokenSecret || !refreshTokenSecret) {
    console.error('JWT secrets are not properly configured');
    throw new Error('JWT_SECRET environment variables are missing');
  }

  // Generate the access token (short-lived)
  const accessToken = jwt.sign({ id: userId }, accessTokenSecret, { expiresIn: '1m' });

  let refreshToken;
  if (rememberMe) {
    // Generate the refresh token (longer-lived)
    refreshToken = jwt.sign({ id: userId }, refreshTokenSecret, { expiresIn: '2m' });
  }

  return { accessToken, refreshToken };
};

  
module.exports = {generateTokens}