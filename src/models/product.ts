import client from './../database';
import { product } from './../interfaces/product';
export class Product {
	id?: number;
	name: string;
	price: number;
	constructor(name: string, price: number, id?: number) {
		this.name = name;
		this.price = price;
		this.id = id;
	}

	static async getAll():Promise<product[]> {
		try {
            const { rows } = await client.query('SELECT * FROM product');
            return rows.m
		} catch (e) {}
	}
}
