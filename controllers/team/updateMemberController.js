const Team = require('../../models/team/team');

const updateMemberInfo = async (req, res) => {
    try {
        const memberId = req.params.id;
        const { workStation, department } = req.body;

        if (!workStation || !department) {
            return res.status(400).json({ error: 'Workstation and Department are required fields' });
        }

        const updatedMember = await Team.findByIdAndUpdate(memberId, { workStation, department }, { new: true });

        if (!updatedMember) {
            return res.status(404).json({ error: 'Member not found' });
        }

        return res.status(200).json({ message: 'Member information updated successfully', member: updatedMember });
    } catch (error) {
        console.error("Error updating member information:", error);
        return res.status(500).json({ error: 'An error occurred while updating member information' });
    }
};

module.exports = {
    updateMemberInfo
};
