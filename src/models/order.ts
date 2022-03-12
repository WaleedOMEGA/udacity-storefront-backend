import client from "../database";
import { product } from "../interfaces/product";

export class Order {
	id?: number;
	status: string;
	products: product[];
	user_id: string;
	constructor(
		status: string,
		products: product[],
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
	static async getByUserId(user_id: string) {
		const query = {
			text: 'select * from order o inner join product p on o.product_id=p.id where o.user_id=$1',
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
}