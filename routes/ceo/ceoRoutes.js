const express = require('express');
const router = express.Router();
const { registerCEO } = require('../../controllers/ceo/ceoRegistrationController');
const { loginCEO } = require('../../controllers/ceo/ceoLoginController');
const { approveRequisition, denyRequisition, updateRequisitionStatus } = require('../../controllers/ceo/ceoActionController');
const Requisition = require('../../models/clients/requisitionModel');

router.post('/register', registerCEO);
router.post('/login', loginCEO);

// Handle updating requisition status
router.put('/requisition/updateStatus', async (req, res) => {
    const { _id, newStatus } = req.body;

    if (!_id || !newStatus) {
        return res.status(400).json({ error: 'Requisition ID and new status are required' });
    }

    try {
        const requisition = await Requisition.findOne({ _id });
        if (!requisition) {
            return res.status(404).json({ error: 'Requisition not found' });
        }

        requisition.status = newStatus;
        await requisition.save();
        return res.status(200).json({ message: 'Requisition status updated successfully' });
    } catch (error) {
        console.error("Error updating requisition status:", error);
        return res.status(500).json({ error: 'An error occurred while updating the requisition status' });
    }
});

module.exports = router;