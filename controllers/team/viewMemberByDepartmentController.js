const Team = require('../../models/team/team');

const viewMembersByDepartment = async (req, res) => {
    try {
        const department = req.params.department;
        const members = await Team.find({ department });

        if (members.length === 0) {
            return res.status(404).json({ error: 'No members found in this department' });
        }

        return res.status(200).json({ members });
    } catch (error) {
        console.error("Error fetching members by department:", error);
        return res.status(500).json({ error: 'An error occurred while fetching members by department' });
    }
};

module.exports = {
    viewMembersByDepartment
};
