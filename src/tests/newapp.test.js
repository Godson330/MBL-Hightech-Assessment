const request = require('supertest'); // Ensure you're using Supertest
const app = require('../app'); // Assuming this is your Express app

// Authentication API Tests
describe('Authentication API', () => {

  // Valid login
  it('should log in a user with valid credentials', async function() {
    const res = await request(app)
      .post('https://qa-test-9di7.onreader.com/login') // Assuming the login endpoint is /login
      .send({ username: 'joe2', password: 'josh' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  // Valid logout
  it('should log out a user successfully', async function() {
    const res = await request(app)
      .post('https://qa-test-9di7.onreader.com/logout');
    expect(res.statusCode).toEqual(200);
  });

  // Handling incorrect credentials
  it('should fail login with incorrect credentials', async function () {
    const res = await request(app)
      .post('https://qa-test-9di7.onreader.com/login')
      .send({ username: 'joshua', password: 'mike' });
    expect(res.statusCode).toEqual(401);
  });
});