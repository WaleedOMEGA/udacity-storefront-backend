import client from "../database";
import bcrypt from 'bcrypt';
import { OMEGA } from './../config';
export class User {
	id: string;
	firstname: string;
	lastname: string;
	password: string;
	constructor(
		id: string,
		firstname: string,
		lastname: string,
		password: string,
	) {
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.password = password;
	}
	getObject() {
		return {
			id: this.id,
			firstname: this.firstname,
			lastname: this.lastname,
		};
	}
	static async getAll(): Promise<User[] | undefined> {
		try {
			const { rows } = await client.query('SELECT * FROM user');
			return rows.map(
				(row) => new User(row.id, row.firstname, row.lastname, row.password),
			);
		} catch (e) {
			console.log('Error fetching all users', e);
		}
	}

	static async getById(id: string) {
		const query = { text: 'SELECT * FROM users WHERE id = $1', values: [id] };
		try {
			const { rows } = await client.query(query);
			if (!rows.length) return null;
			return new User(
				rows[0].id,
				rows[0].firstname,
				rows[0].lastname,
				rows[0].password,
			);
		} catch (e) {
			console.log(`Error fetching user with id: ${id}`, e);
		}
	}

	async create() {
		this.password = await bcrypt.hash(this.password, OMEGA);
		const query = {
			text: 'INSERT INTO users(id, firstname, lastname, password) VALUES($1, $2, $3, $4)',
			values: [this.id, this.firstname, this.lastname, this.password],
		};
		try {
			await client.query(query);
		} catch (e) {
			console.log('Error creating new user', e);
		}
	}
	async update(hash?: boolean) {
		if (hash) this.password = await bcrypt.hash(this.password, OMEGA);
		const query = {
			text: 'UPDATE users SET firstname = $1, lastname = $2, password = $3 WHERE id = $4',
			values: [
				this.firstname,
				this.lastname,
				this.password,
				this.id
			],
		};
		try {
			await client.query(query);
		} catch (e) {
			console.log(`Error updating user with id: ${this.id}`, e);
		}
	}

	async delete() {
		const query = {
			text: 'DELETE FROM users WHERE id = $1',
			values: [this.id],
		};
		try {
			await client.query(query);
		} catch (e) {
			console.log(`Error deleting user with id: ${this.id}`, e);
		}
	}
}
export default User;