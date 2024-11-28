const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3001;

const SECRET_KEY = 'your_jwt_secret';

app.get('/', (req: any, res: any) => {
  res.send('Hello, TypeScript with Node.js!');
});

const users = [{ id: 1, username: 'dev', password: bcrypt.hashSync('pass', 8) }];

interface loginParams {
  username: string, 
  password: string
}

app.post('/login', (req: {body: loginParams}, res: any) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

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

app.get('/protected', authenticateJWT, (req: any, res: any) => {
  res.send(`Hello ${req.user.username}, you have accessed a protected route!`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});