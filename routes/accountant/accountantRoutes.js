// routes/ceoRoutes.js
const express = require('express');
const router = express.Router();
const { registerAccountant } = require('../../controllers/accountant/accountantRegistrationController');
const { loginAccountant } = require('../../controllers/accountant/accountantLoginController');
const { payOut } = require('../../controllers/accountant/accountantActionController');

router.post('/register', registerAccountant);

router.post('/login', loginAccountant);

// Handle approving a requisition
router.put('/requisition/payOut', async (req, res) => {
    const { requisitionId } = req.body;

    if (!requisitionId) {
        return res.status(400).json({ error: 'Requisition ID is required' });
    }

    try {
        const result = await payOut(requisitionId);
        return res.status(200).json({ message: result });
    } catch (error) {
        console.error("Error disbursing requisition:", error);
        return res.status(500).json({ error: 'An error occurred while disbursing the requisition' });
    }
});

module.exports = router;