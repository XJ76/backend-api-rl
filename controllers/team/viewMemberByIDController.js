const Team = require('../../models/team/team');

const viewMemberByID = async (req, res) => {
    try {
        const memberId = req.params.id;
        const member = await Team.findById(memberId);

        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        return res.status(200).json({ member });
    } catch (error) {
        console.error("Error fetching member by ID:", error);
        return res.status(500).json({ error: 'An error occurred while fetching member by ID' });
    }
};

module.exports = {
    viewMemberByID
};
