import { Router } from 'express';
import { auth } from '../auth';
import User from '../models/user';

const user = Router();
user.get(
	'/all/',
	auth.requiresAuth(async (req, res) => {
		const users = await User.getAll();
		res.send(users?.map((user) => user.getObject()));
	}),
);

user.get(
	'/:id/',
	auth.requiresAuth(async (req, res) => {
		const { id } = req.params;
		if (!id) return res.status(400).send();
		const user = await User.getById(id);
		if (!user) res.status(204);
		res.send(user?.getObject() || `No user found with id: ${id}`);
	}),
);

user.post(
	'/',
	async (req, res, auth) => {
	
		const { id, firstname, lastname, password, superuser } = req.body;
		if (!id || !firstname || !lastname || !password)
			return res.status(400).send();
		const user = new User(id, firstname, lastname, password);
		await user.create();
		res.send(user.getObject());
	}
);


export default user;
