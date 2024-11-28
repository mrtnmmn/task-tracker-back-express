const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_jwt_secret';

const authenticateJWT = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export default authenticateJWT