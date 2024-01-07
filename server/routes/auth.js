import express from "express";
import { check, login , register } from "../controllers/auth.js";

const router = express.Router()

router.post('/login',login)

router.post('/register',register)

router.get('/check',check)


export default router