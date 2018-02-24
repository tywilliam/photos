import express, { Router } from 'express';
import { resolve } from 'path';

const router = new Router();

router.get('*', express.static(resolve(__dirname, '../assets')));

export { router as default };
