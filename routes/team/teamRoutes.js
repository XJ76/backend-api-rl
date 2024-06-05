const express = require('express');
const router = express.Router();
const addMemberController = require('../../controllers/team/addMemberController.js');
const viewAllMembersController = require('../../controllers/team/viewAllMembersController.js');
const viewMemberByIDController = require('../../controllers/team/viewMemberByIDController.js');
const viewMemberByDepartmentController = require('../../controllers/team/viewMemberByDepartmentController.js');
const updateMemberController = require('../../controllers/team/updateMemberController.js');
const deleteMemberController = require('../../controllers/team/deleteMemberController.js');

router.post('/member', addMemberController.createMember);
router.get('/members', viewAllMembersController.viewAllMembers);
router.get('/members/:id', viewMemberByIDController.viewMemberByID);
router.get('/members/department/:department', viewMemberByDepartmentController.viewMembersByDepartment);
router.put('/members/:id', updateMemberController.updateMemberInfo);
router.delete('/members/:id', deleteMemberController.deleteMemberById);

module.exports = router;
