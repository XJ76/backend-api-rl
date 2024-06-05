const Team = require('../../models/team/team');

const deleteMemberById = async (req, res) => {
    try {
        const memberId = req.params.id;

        if (!memberId) {
            return res.status(400).json({ error: 'Member ID is required' });
        }

        const deletedMember = await Team.findByIdAndDelete(memberId);

        if (!deletedMember) {
            return res.status(404).json({ error: 'Member not found' });
        }

        return res.status(200).json({ message: 'Member deleted successfully', deletedMember });
    } catch (error) {
        console.error("Error deleting member:", error);
        return res.status(500).json({ error: 'An error occurred while deleting the member' });
    }
};

module.exports = {
    deleteMemberById
};
