import { LoginParams } from "../models/auth";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = [{ id: 1, username: 'dev', password: bcrypt.hashSync('pass', 8) }];
const SECRET_KEY = 'your_jwt_secret';

export const login = (req: any, res: any) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
}

export const protectedRoute = (req: any, res: any) => {
  res.send(`Hello ${req.user.username}, you have accessed a protected route!`);
};