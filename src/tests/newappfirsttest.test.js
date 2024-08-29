const request = require('supertest');
const app = require('../app');

// Example token (replace with actual token for testing)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUyOWRkOTA3LWNmMTUtNGI4Yy04MzU4LTIwM2ZkODgxZjFjZCIsInVzZXJuYW1lIjoiam9lIiwiaWF0IjoxNzIzMTMwNDg4fQ.L0veYqRdR6-Lh0L8UnSxNY4OWH8jES1SvGdxDKXI-Bg';

// User Management API Tests
describe('User Management API', function () {
  // Creating new user account
  it('should create a new user', async function () {
    const res = await request(app)
      .post('https://qa-test-9di7.onreader.com/users')
      .send({ username: 'joe2', password: 'josh' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  // Updating user account
  it('should update user details', async function () {
    const res = await request(app)
      .put('https://qa-test-9di7.onreader.com/users/joe2')
      .set('Authorization', `Bearer ${token}`) // Include token here
      .send({ username: 'joe_updated' });
    expect(res.statusCode).toEqual(200);
  });

  // Deleting user account
  it('should delete a user', async function () {
    const res = await request(app)
      .delete('https://qa-test-9di7.onreader.com/users/joe2')
      .set('Authorization', `Bearer ${token}`) // Include token here
    expect(res.statusCode).toEqual(200);
  });

  // Fetching user details
  describe('Fetching User Details and Access Control', function () {
    it('should fetch user details', async function () {
      const res = await request(app)
        .get('https://qa-test-9di7.onreader.com/users/joe2')
        .set('Authorization', `Bearer ${token}`) // Include token here
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('username', 'joe2');
    });

    // Validating access control
    it('should not allow access to another user’s data', async function () {
      const res = await request(app)
        .get('https://qa-test-9di7.onreader.com/users/another-user')
        .set('Authorization', `Bearer ${token}`) // Include token here
      expect(res.statusCode).toEqual(403);
    });
  });
});

// Item Management API Tests
describe('Item Management API', function () {
  // Create Items
  it('should create a new item', async function () {
    const res = await request(app)
      .post('https://qa-test-9di7.onreader.com/items')
      .set('Authorization', `Bearer ${token}`) // Include token here
      .send({ name: 'Item4' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  // Update Items
  it('should update an item', async function () {
    const res = await request(app)
      .put('https://qa-test-9di7.onreader.com/items/1')
      .set('Authorization', `Bearer ${token}`) // Include token here
      .send({ name: 'UpdatedItem' });
    expect(res.statusCode).toEqual(200);
  });

  // Delete Items
  it('should delete an item', async function () {
    const res = await request(app)
      .delete('https://qa-test-9di7.onreader.com/items/1')
      .set('Authorization', `Bearer ${token}`) // Include token here
    expect(res.statusCode).toEqual(200);
  });

  // Fetch items
  it('should fetch items', async function () {
    const res = await request(app)
      .get('https://qa-test-9di7.onreader.com/items')
      .set('Authorization', `Bearer ${token}`) // Include token here
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Ensure only the owner can modify items
  it('should not allow modifying another user’s item', async function () {
    const res = await request(app)
      .put('https://qa-test-9di7.onreader.com/items/2')
      .set('Authorization', `Bearer ${token}`) // Include token here
      .send({ name: 'Item 5' });
    expect(res.statusCode).toEqual(403);
  });

  // Ensure only the owner can delete items
  it('should not allow deleting another user’s item', async function () {
    const res = await request(app)
      .delete('https://qa-test-9di7.onreader.com/items/2')
      .set('Authorization', `Bearer ${token}`) // Include token here
    expect(res.statusCode).toEqual(403);
  });

  // Handling duplicate items
  it('should handle duplicate items', async function () {
    const res = await request(app)
      .post('https://qa-test-9di7.onreader.com/items')
      .set('Authorization', `Bearer ${token}`) // Include token here
      .send({ name: 'Item4' });
    expect(res.statusCode).toEqual(409);
  });

  // Handling invalid input
  it('should handle invalid input for items', async function () {
    const res = await request(app)
      .post('https://qa-test-9di7.onreader.com/items')
      .set('Authorization', `Bearer ${token}`) // Include token here
      .send({ invalidField: 'InvalidValue' });
    expect(res.statusCode).toEqual(400);
  });
});
