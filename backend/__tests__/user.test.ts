import request from 'supertest';
import app from '../src/app';

describe('User Routes', () => {
  let token: string; // To store the authentication token
  let userId: number; // To store the ID of the user created in the test
  let token2: string; // To store the authentication token
  let userId2: number; // To store the ID of the user created in the test
  let token3: string; // To store the authentication token
  let userId3: number; // To store the ID of the user created in the test

  beforeAll(async () => {
    const response = await request(app).post('/api/v1/user/').send({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    });

    token = response.body.token; // Store the token for future requests
    userId = response.body.user.id; // Store the ID of the user created in the test
  });

  afterAll(async () => {
    // delete token2
    await Promise.all([
      request(app)
        .delete(`/api/v1/user/${userId}`)
        .set('Authorization', `Bearer ${token}`),
      request(app)
        .delete(`/api/v1/user/${userId2}`)
        .set('Authorization', `Bearer ${token2}`),
      request(app)
        .delete(`/api/v1/user/${userId3}`)
        .set('Authorization', `Bearer ${token3}`),
    ]);
  });

  describe('POST /api/v1/user/login', () => {
    test('should return 200 OK and a token when valid credentials are provided', async () => {
      const response = await request(app).post('/api/v1/user/login').send({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    test('should return 401 Unauthorized when invalid credentials are provided', async () => {
      const response = await request(app).post('/api/v1/user/login').send({
        email: 'test@example.com',
        password: 'wrongpassword',
      });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/v1/user/me', () => {
    test('should return 200 OK and the user information', async () => {
      const response = await request(app)
        .get('/api/v1/user/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
    });

    test('should return 401 Unauthorized when no token is provided', async () => {
      const response = await request(app).get('/api/v1/user/me');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/v1/user/test', () => {
    test('should return 201 Created and a new test user', async () => {
      const response = await request(app)
        .get('/api/v1/user/test')
        .set('Authorization', `Bearer ${token}`);

      token3 = response.body.token;
      userId3 = response.body.user.id;

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user');
    });
  });

  describe('POST /api/v1/user', () => {
    test('should return 201 Created and a new user', async () => {
      const response = await request(app)
        .post('/api/v1/user')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'newuser@example.com',
          password: 'newpassword123',
          name: 'New User',
        });

      token2 = response.body.token;
      userId2 = response.body.user.id;

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user');
    });

    test('should return 409 Conflict when creating a user with an existing email', async () => {
      const response = await request(app)
        .post('/api/v1/user')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'test@example.com', // Use an existing email
          password: 'password123',
          name: 'Duplicate User',
        });

      expect(response.status).toBe(409);
    });
  });

  describe('GET /api/v1/user', () => {
    test('should return 200 OK and an array of users', async () => {
      const response = await request(app)
        .get('/api/v1/user')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('users');
      expect(Array.isArray(response.body.users)).toBe(true);
    });
  });

  describe('GET /api/v1/user/:id', () => {
    test('should return 200 OK and the user with the specified ID', async () => {
      const response = await request(app)
        .get('/api/v1/user/1')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
    });

    test('should return 404 Not Found when the user with the specified ID does not exist', async () => {
      const response = await request(app)
        .get('/api/v1/user/999')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/v1/user/:id', () => {
    test('should return 200 OK and update the user with the specified ID', async () => {
      const response = await request(app)
        .put(`/api/v1/user/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          password: 'newpassword123',
          name: 'Updated User',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
    });

    test('should return 403 Forbidden when trying to update a user with a different ID', async () => {
      const response = await request(app)
        .put(`/api/v1/user/${userId2}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          password: 'newpassword123',
          name: 'Updated User',
        });

      expect(response.status).toBe(403);
    });
  });

  describe('DELETE /api/v1/user/:id', () => {
    test('should return 403 Forbidden when trying to delete a user with a different ID', async () => {
      const response = await request(app)
        .delete(`/api/v1/user/${userId2}`) // Use a different ID
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(403);
    });
    test('should return 200 OK and delete the user with the specified ID', async () => {
      const response = await request(app)
        .delete(`/api/v1/user/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
    });
  });
});
