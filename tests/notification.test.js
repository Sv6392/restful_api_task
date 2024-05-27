const request = require('supertest');
const { app } = require('../src/app');
const pool = require('../src/models/db');

describe('Notification Endpoints', () => {
    afterAll(() => {
        pool.end();
    });

    it('should get notifications', async () => {
        const res = await request(app)
            .get('/notifications');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
