const request = require('supertest');
const { app } = require('../src/app');
const pool = require('../src/models/db');

describe('Bid Endpoints', () => {
    afterAll(() => {
        pool.end();
    });

    it('should place a bid', async () => {
        const res = await request(app)
            .post('/bids')
            .send({
                item_id: 1,
                bid_amount: 150.00
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should get bids by item ID', async () => {
        const res = await request(app)
            .get('/bids/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
