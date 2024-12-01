const { default: isEmail } = require("validator/lib/isEmail");
const User = require("../../models/user.model");
const { generateTokens } = require("../../utils/tokenGenerator");




// Login route
const login = async (req, res) => {
  const { identifier, password, rememberMe } = req.body; 
  console.log(rememberMe)
  let query;

  if (isEmail(identifier)) {
      query = { email: identifier }; 
  } else {
      query = { username: identifier }; 
  }

  try {
    
      const user = await User.findOne(query);
      if (!user) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

    
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

   
      const { accessToken, refreshToken } = generateTokens(user._id, rememberMe);
     
      if (rememberMe) {
        console.log(  refreshToken)
          res.cookie('refreshToken', refreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });
      }

      res.json({
          accessToken,
          user: { id: user._id, username: user.username, email: user.email }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};




 const register = async (req, res) => {
    const { userName, email, password , firstName , lastName,country } = req.body;
   console.log(req.body)
    try {
      // Check if user already exists
      const userExists = await User.findOne({ email });
       
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create new user
      const user = new User({ username:userName, email, password ,firstName , lastName,country });
      await user.save();
  
      // Generate JWT token
      const token = generateTokens(user._id);
      console.log("register : " , { token, user: { id: user._id, username: user.username, email: user.email ,firstName:user.firstName , lastName:user.lastName , country:user.country }})
      res.json({ token, user: { id: user._id, username: user.username, email: user.email ,firstName:user.firstName , lastName:user.lastName , country:user.country } });
    } catch (error) {
      res.status(500).json({ errorMessages:error.errors });
    }
  };


const refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken; // Securely stored HttpOnly cookie
  
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token missing' });
  
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid refresh token' });
  
      // Generate new access token
      const newAccessToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '15m' } // Short-lived access token
      );
  
      res.json({ accessToken: newAccessToken });
    });
  };

module.exports = {login , register , refreshToken}