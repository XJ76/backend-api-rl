const Requisition = require('../../models/clients/requisitionModel');

// Function to view all requisitions
async function viewAllRequisitions(req, res) {
    try {
        const allRequisitions = await Requisition.find();
        res.status(200).json(allRequisitions); // Fixed bug: Added status code 200 for successful response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Function to view a requisition by ID
async function viewRequisitionById(req, res) {
    try {
        const requisitionId = req.params.id;
        const requisition = await Requisition.findById(requisitionId);

        if (requisition) {
            res.status(200).json(requisition); 
        } else {
            res.status(404).json({ message: 'Requisition not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Function to view all the requisitions with the given status
async function viewRequisitionsByStatus(req, res) {
    try {
        const status = req.body.status; // Taking status from the payload
        
        const requisitions = await Requisition.find({ status });

        if (requisitions.length > 0) {
            res.status(200).json(requisitions); 
        } else {
            res.status(404).json({ message: `No requisitions found with status: ${status}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { viewAllRequisitions, viewRequisitionById, viewRequisitionsByStatus };
