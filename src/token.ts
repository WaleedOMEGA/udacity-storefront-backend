import jwt from 'jsonwebtoken';
import { secret } from './config';
export class Token {
	static generate(data: string, expiresIn?: string | number) {
		return jwt.sign(data, secret, { expiresIn });
	}

	static verify(token: string): string | undefined {
		try {
			const data = jwt.verify(token, secret);
			return data as string;
		} catch (e) {
			console.log('Error verifying JWT token', e);
		}
	}
}
