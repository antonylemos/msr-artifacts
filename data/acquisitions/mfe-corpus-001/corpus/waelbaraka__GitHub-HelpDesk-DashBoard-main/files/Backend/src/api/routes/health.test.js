import request from 'supertest';
import app from '../../app.js'; // path to your exported express app

describe('Health endpoint', () => {
  it('should respond with status UP', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'UP');
    expect(res.body).toHaveProperty('message');
  });
});
