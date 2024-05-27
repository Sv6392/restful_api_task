const request = require('supertest');
const { app } = require('../src/app');
const pool = require('../src/models/db');

describe('User Endpoints', () => {
    afterAll(() => {
        pool.end();
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/users/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'test@example.com',
                role: 'user'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
