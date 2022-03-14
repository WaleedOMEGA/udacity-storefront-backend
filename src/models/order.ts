import client from "../database";
import { product } from "../interfaces/product";

export class Order {
	id?: number;
	status: string;
	products: { product_id: number; quantity: number }[];
	user_id: string;
	constructor(
		status: string,
		products: { product_id: number; quantity: number }[],
		user_id: string,
		id?: number,
	) {
		this.status = status;
		this.products = products;
		this.user_id = user_id;
		this.id = id;
	}

	getObject() {
		return {
			id: this.id,
			status: this.status,
			products: this.products,
			user_id: this.user_id,
		};
	}

	static async getAll() {
		try {
			const { rows } = await client.query(
				'select * from orders o inner join product p on o.product_id=p.id',
			);
			return rows.map(
				(row) => new Order(row.status, row.products, row.user_id, row.id),
			);
		} catch (e) {
			console.log('Error fetching all orders', e);
		}
	}

	static async getById(id: number) {
		const query = {
			text: 'select * from orders o inner join product p on o.product_id=p.id WHERE o.id = $1',
			values: [id],
		};
		try {
			const { rows } = await client.query(query);
			if (!rows.length) return null;
			return new Order(
				rows[0].status,
				rows[0].products,
				rows[0].user_id,
				rows[0].id,
			);
		} catch (e) {
			console.log(`Error fetching order with id: ${id}`, e);
		}
	}
	static async getByUserId(user_id: string) {
		const query = {
			text: 'select * from orders o inner join product p on o.product_id=p.id where o.user_id=$1',
			values: [user_id],
		};
		try {
			const { rows } = await client.query(query);
			return rows.map(
				(row) => new Order(row.status, row.products, row.user_id, row.id),
			);
		} catch (e) {
			console.log(`Error fetching orders with user_id: ${user_id}`, e);
		}
	}

	async create() {
		const query = {
			text: 'INSERT INTO orders(status, user_id) VALUES($1, $2) RETURNING id',
			values: [this.status, this.user_id],
		};
		try {
			const { rows } = await client.query(query);
			this.id = rows[0].id;
		} catch (e) {
			console.log('Error creating new order', e);
		}
	}

	async update() {
		if (!this.id) return;
		const query = {
			text: 'UPDATE orders SET status = $1, user_id = $2 WHERE id = $3',
			values: [this.status, this.user_id, this.id],
		};
		try {
			await client.query(query);
		} catch (e) {
			console.log(`Error update order with id: ${this.id}`, e);
		}
	}

	async delete() {
		if (!this.id) return;
		
		const query = {
			text: 'DELETE FROM orders WHERE id = $1',
			values: [this.id],
		};
		try {
			await client.query(query);
		} catch (e) {
			console.log(`Error deleting order with id: ${this.id}`, e);
		}
	}
}