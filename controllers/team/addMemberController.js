const Team = require('../../models/team/team');

const createMember = async (req, res) => {
    try {
        const { name, surname, gender, employeeID, workStation, department, nationalID } = req.body;

        if (!name || !surname || !gender || !employeeID || !workStation || !department || !nationalID) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newMember = new Team({
            name,
            surname,
            gender,
            employeeID,
            workStation,
            department,
            nationalID
        });

        await newMember.save();

        return res.status(201).json({ message: 'New member created successfully', member: newMember });
    } catch (error) {
        console.error("Error creating new member:", error);
        return res.status(500).json({ error: 'An error occurred while creating a new member' });
    }
};

module.exports = {
    createMember
};
