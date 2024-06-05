const Requisition = require('../../models/clients/requisitionModel');

// Controller to handle creating a new requisition
const createRequisition = async (req, res) => {
    try {
        const { fullName, id, amount, purpose, description, contact, location } = req.body;
        const newRequisition = new Requisition({ fullName, id, amount,purpose, description, contact, location });
        const savedRequisition = await newRequisition.save();
        res.json(savedRequisition);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createRequisition
};