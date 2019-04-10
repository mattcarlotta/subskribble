import request from 'supertest';
import express from 'express';
import middlewares from 'middlewares';
import routes from 'routes';

const app = express();

middlewares(app);
routes(app);

module.exports = () => request(app);
