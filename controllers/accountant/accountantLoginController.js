const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Accountant = require('../../models/accountant/accountantModel'); // Update model import

//@desc Accountant Login
//@route POST /api/accountant/login 
//@access private
const loginAccountant = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      
      return res.status(400).send("Please provide both email and password");
    }
    const accountant = await Accountant.findOne({ email });
    if (!accountant) {
      
      return res.status(401).send("Invalid email");
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, accountant.password);
    if (!isPasswordValid) {
     
     
      return res.status(401).send("Invalid password");
    }

    const accessToken = jwt.sign(
      {
        accountant: {
          name: accountant.name,
          email: accountant.email,
          id: accountant.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );
    return res.status(200).json({ accessToken });
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { loginAccountant, errorHandler };