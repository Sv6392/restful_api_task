const request = require('supertest');
const { app } = require('../src/app');
const pool = require('../src/models/db');

describe('Item Endpoints', () => {
    afterAll(() => {
        pool.end();
    });

    it('should create a new item', async () => {
        const res = await request(app)
            .post('/items')
            .send({
                name: 'Test Item',
                description: 'This is a test item',
                starting_price: 100.00,
                end_time: '2024-06-01T00:00:00Z',
                image_url: 'http://example.com/image.jpg'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should get an item by ID', async () => {
        const res = await request(app)
            .get('/items/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should get all items', async () => {
        const res = await request(app)
            .get('/items');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
