const Team = require('../../models/team/team');

const viewAllMembers = async (req, res) => {
    try {
        const allMembers = await Team.find();
        return res.status(200).json({ members: allMembers });
    } catch (error) {
        console.error("Error fetching all members:", error);
        return res.status(500).json({ error: 'An error occurred while fetching all members' });
    }
};

module.exports = {
    viewAllMembers
};
