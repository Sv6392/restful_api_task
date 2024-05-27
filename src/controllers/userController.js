const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    async register(req, res) {
        const { username, password, email, role } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.createUser(username, hashedPassword, email, role);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: 'Error creating user', error });
        }
    },

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await User.findUserByUsername(username);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(400).json({ message: 'Error logging in', error });
        }
    },

    async getProfile(req, res) {
        try {
            const user = await User.findUserById(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: 'Error fetching user profile', error });
        }
    },
};
