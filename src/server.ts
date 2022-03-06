import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import client from './database'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})
export async function connect() {
	try {
		await client.connect();
	} catch (e) {
		console.log('Error starting connecting to PG database:', e);
	}
}

export async function disconnect() {
	try {
		await client.end();
	} catch (e) {
		console.log('Error terminating connection to PG database:', e);
	}
}
app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
