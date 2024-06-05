const express = require('express');
const router = express.Router();
const { createRequisition } = require('../../controllers/clients/requisitionController');
const { viewAllRequisitions, viewRequisitionById, viewRequisitionsByStatus } = require('../../controllers/ceo/viewRequisitionsController');

// Route to create a new requisition
router.post('/request', createRequisition);

router.get('/viewAll', viewAllRequisitions);

router.get('/viewById', viewRequisitionById);

router.get('/viewByStatus', viewRequisitionsByStatus);

module.exports = router;