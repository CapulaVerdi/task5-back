import express from 'express'
import { getSongs } from './controller.js';

const router = express.Router();

router.post('/getSongs', getSongs)

export default router