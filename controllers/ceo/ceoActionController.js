// controllers/ceo/ceoActionController.js

const Requisition = require('../../models/clients/requisitionModel');

// Function to approve a requisition
const approveRequisition = async (requisitionId) => {
    try {
        if (!requisitionId) {
            return "Invalid requisition ID";
        }

        const requisition = await Requisition.findOne({ contact: requisitionId });
        if (!requisition) {
            return "Requisition not found";
        }

        requisition.status = 'Approved';
        await requisition.save();
        return "Requisition approved successfully";
    } catch (error) {
        console.error("Error approving requisition:", error);
        return "An error occurred while approving the requisition";
    }
};

// Function to deny a requisition
const denyRequisition = async (requisitionId) => {
    try {
        if (!requisitionId) {
            return "Invalid requisition ID";
        }

        const requisition = await Requisition.findOne({ contact: requisitionId });
        if (!requisition) {
            return "Requisition not found";
        }

        requisition.status = 'Denied';
        await requisition.save();
        return "Requisition denied successfully";
    } catch (error) {
        console.error("Error denying requisition:", error);
        return "An error occurred while denying the requisition";
    }
};

module.exports = {
    approveRequisition,
    denyRequisition
};