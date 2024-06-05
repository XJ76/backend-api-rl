const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CEO = require('../../models/ceo/ceoModel'); 

//@desc Register CEO
//@route POST /api/ceo/register // Update route
//@access private
const registerCEO = asyncHandler(async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) {
            
            return res.status(400).send("All Fields are Mandatory");
        }
        const ceoAvailable = await CEO.findOne({ email });
        if (ceoAvailable) {
            res.status(400);
            throw new Error('CEO already registered!');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password: ' + hashedPassword);
        const ceo = await CEO.create({
            name,
            email,
            phone,
            password: hashedPassword,
        });

        console.log(`CEO created: ${ceo}`);
        if (ceo) {
            res.status(201).json({ _id: ceo.id, email: ceo.email });
        } else {
            res.status(400);
            throw new Error('CEO data not valid');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = { registerCEO };