const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // const token = req.headers['authorization'] || req.body.token;
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if (!authHeader) {
        return res.sendStatus(401); // Kiểm tra xem header Authorization có tồn tại không
    }
    // const token = authHeader && authHeader.split(' ')[1];
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDMzNDUxZmVlN2NhMTg0ODRmNWRjNiIsImlhdCI6MTcxNTcwNTQzMCwiZXhwIjoxNzE1NzA5MDMwfQ.uxrnztOloW-db8TtDhco1jYp70HE2YgEd06YDlXBw6U";

    if (!token) {
         return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.redirect('/login');
        }
        next();
    });
};

module.exports = authenticateToken;
