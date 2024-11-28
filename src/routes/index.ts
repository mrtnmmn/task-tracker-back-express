import authRoutes from "./authRoutes";

const express = require('express');

const router = express.Router()

console.log('here')
router.use('/auth', authRoutes);
router.use('/', (_req: any, res: { send: (arg0: string) => any; }) => res.send('Hello, TypeScript with Node.js!'));

export default router