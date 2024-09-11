const router = require('express').Router();
const User = require('./User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.json({ success: false, message: 'Missing username or password' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    try {
        await user.save();
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
    });

router.post('/login', async (req, res) => { 
    const { username, password } = req.body;
    if (!username || !password) {
        return res.json({ success: false, message: 'Missing username or password' });
    }
    
    const user = await User.findOne({ username });
    if (!user) {
        return res.json({ success: false, message: 'User not found' });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.json({ success: false, message: 'Incorrect password' });
    }
    
    res.json({ success: true, user: { username: user.username } });
    });

module.exports = router;
