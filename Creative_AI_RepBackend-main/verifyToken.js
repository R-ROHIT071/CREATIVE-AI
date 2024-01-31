const verifyToken = (req, res, next) => {
    const customToken = req.headers['x-custom-token'];

    if (!customToken || customToken !== process.env.AUTH_TOKEN) {
        return res.status(403).json({ success: false, error: 'Invalid or missing token' });
    }

    next();
};

module.exports = { verifyToken };
