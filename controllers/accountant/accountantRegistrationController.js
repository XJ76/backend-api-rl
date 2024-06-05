const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const Accountant = require('../../models/accountant/accountantModel'); // Update model import

//@desc Register Accountant
//@route POST /api/accountant/register // Update route
//@access private
const registerAccountant = asyncHandler(async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) {
            // res.status(400);
            return res.status(400).send("All Fields Are Required");
        }
        const accountantAvailable = await Accountant.findOne({ email });
        if (accountantAvailable) {
            // res.status(400);
            return res.status(401).send("Already Exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password: ' + hashedPassword);
        const accountant = await Accountant.create({
            name,
            email,
            phone,
            password: hashedPassword,
        });

        console.log(`Accountant created: ${accountant}`);
        if (accountant) {
            res.status(201).json({ _id: accountant.id, email: accountant.email });
        } else {
            // res.status(400);
            return res.status(400).send("Invalid Accountant Data ");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = { registerAccountant };