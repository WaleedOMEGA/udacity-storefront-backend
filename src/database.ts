import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
POSTGRES_HOST,
    POSTGRES_DB,
POSTGRES_DB_TEST,
POSTGRES_USER,
    POSTGRES_PASSWORD,
    OMEGA,
SECRET,
ENV
}=process.env

let env;
const dev = {
	host: POSTGRES_HOST,
	database: POSTGRES_DB,
	user: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
};
const test = {
	host: POSTGRES_HOST,
	database: POSTGRES_DB_TEST,
	user: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
};
if (ENV === 'test') {
	env = test;
} else {
	env===dev
}




	const client = new Pool(env);





export default client;