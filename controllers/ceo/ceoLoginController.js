const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CEO = require('../../models/ceo/ceoModel'); // Update model import

//@desc CEO Login
//@route POST /api/ceo/login 
//@access private
const loginCEO = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('All fields are mandatory');
    }
    const ceo = await CEO.findOne({ email });
    if (!ceo) {
      res.status(401);
      throw new Error('Invalid email');
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, ceo.password);
    if (!isPasswordValid) {
      res.status(401);
      throw new Error('Invalid password');
    }

    const accessToken = jwt.sign(
      {
        ceo: {
          name: ceo.name,
          email: ceo.email,
          id: ceo.id,
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

module.exports = { loginCEO, errorHandler };