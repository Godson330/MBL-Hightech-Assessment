it('should refresh an expired token', async function() {
  const res = await request(app)
    .post('/refresh-token')
    .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUyOWRkOTA3LWNmMTUtNGI4Yy04MzU4LTIwM2ZkODgxZjFjZCIsInVzZXJuYW1lIjoiam9lIiwiaWF0IjoxNzIzMTMwNDg4fQ.L0veYqRdR6-Lh0L8UnSxNY4OWH8jES1SvGdxDKXI-Bg`) // Include the expired token
    .send(); 

  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('newToken'); // Expect a new token to be returned
});
