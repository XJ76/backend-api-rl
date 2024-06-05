// controllers/ceo/ceoActionController.js

const Requisition = require('../../models/clients/requisitionModel');

// Function to approve a requisition
const payOut = async (requisitionId) => {
    try {
        if (!requisitionId) {
            return "Invalid requisition ID";
        }

        const requisition = await Requisition.findOne({ contact: requisitionId });
        if (!requisition) {
            return "Requisition not found";
        }

        requisition.status = 'Disbursed';
        await requisition.save();
        return "Requisition disbursed successfully";
    } catch (error) {
        console.error("Error disbursing requisition:", error);
        return "An error occurred while disbursing the requisition";
    }
};

module.exports = { payOut };