import * as app from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

app.defaults.adapter = httpAdapter;

export const imageAPI = () => (
	app.create({
		baseUrl: 'http://localhost:4000/api/',
		withCredentials: true
	})
)

export default app.create({
	baseURL: 'http://localhost:5000/api/',
	withCredentials: true
})
