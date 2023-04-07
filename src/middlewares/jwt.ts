const jwt = require('jsonwebtoken');

export function authMiddleware(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, 'your-secret-key');
        req.userId = decodedToken.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Não autorizado.' });
    }
}
