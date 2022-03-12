import { Router } from 'express';
import { auth } from '../auth';
import { Order } from '../models/order';

const order = Router();
order.get(
	'/user/:user_id/',
	auth.requiresAuth(async (req, res, auth) => {
		if (!auth) return res.status(401).send();
		const { user_id } = req.params;
		if (!user_id) return res.status(400).send();
		const orders = await Order.getByUserId(user_id);
		res.send(orders?.map((order) => order.getObject()));
	}),
);
export default order;
