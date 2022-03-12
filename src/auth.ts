import { NextFunction, Request, Response } from 'express';
import { Token } from './token';


export type handler = (
	req: Request,
	res: Response,
	user: string,
	next: NextFunction,
) => void;
export class auth {
	static requiresAuth(func:handler) {
		return function (req: Request, res: Response, next: NextFunction) {
			const { authorization } = req.headers;
			if (!authorization) return res.status(401).send();
			const [type, token] = authorization.split(' ');
			if (!token || type.toLowerCase() !== 'bearer')
				return res.status(401).send();
			const data = Token.verify(token);
			if (!data) return res.status(401).send();
			func(req, res, data, next);
		};
	}
}