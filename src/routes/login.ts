import { Router } from "express";
import User from "../models/user";
import bcrypt from 'bcrypt';
import { token } from "../util";
import { expire } from './../config';
const login = Router();
login.post('/login/', async (req, res) => {
    
	const { id, password } = req.body;
	if (!id || !password) return res.status(400).send();
	const user = await User.getById(id);
	if (!user) return res.status(404).send(`No user found with id: ${id}`);
	const isValid = await bcrypt.compare(password, user.password);
	if (!isValid) return res.status(401).send('Password mismatch');
	res.send(
		token.generate(id, expire),
    );
});
export default login;