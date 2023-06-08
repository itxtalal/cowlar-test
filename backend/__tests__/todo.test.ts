import request from 'supertest';
import app from '../src/app';
import { Todo } from '@prisma/client';

describe('Todo Controller', () => {
  let token: string;
  let userId: number;
  let testTodo: Todo;

  beforeAll(async () => {
    const response = await request(app).post('/api/v1/user').send({
      email: 'testuser@gmail.com',
      password: 'testpassword',
      name: 'Test',
    });

    token = response.body.token;
    userId = response.body.user.id;
  });

  afterAll(async () => {
    await request(app)
      .delete(`/api/v1/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);
  });

  describe('POST /api/v1/todo', () => {
    test('should create a new todo', async () => {
      const response = await request(app)
        .post('/api/v1/todo')
        .send({ title: 'Test Todo', completed: false })
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body.todo.title).toBe('Test Todo');

      testTodo = response.body.todo;
    });
  });

  describe('GET /api/v1/todo', () => {
    test('should get all todos', async () => {
      const response = await request(app)
        .get('/api/v1/todo')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.todos.length).toBe(1);
    });
  });

  describe('GET /api/v1/todo/:id', () => {
    test('should get a specific todo', async () => {
      const response = await request(app)
        .get(`/api/v1/todo/${testTodo.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.todo.title).toBe('Test Todo');
    });
  });

  describe('PUT /api/v1/todo/:id', () => {
    test('should update a todo', async () => {
      const response = await request(app)
        .put(`/api/v1/todo/${testTodo.id}`)
        .send({ title: 'Updated Todo', completed: true })
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.todo.title).toBe('Updated Todo');
      expect(response.body.todo.completed).toBe(true);
    });
  });

  describe('GET /api/v1/todo/:id/toggle', () => {
    test('should toggle a todo', async () => {
      const response = await request(app)
        .get(`/api/v1/todo/${testTodo.id}/toggle`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.todo.completed).toBe(false);
    });
  });

  describe('DELETE /api/v1/todo/:id', () => {
    test('should delete a todo', async () => {
      const response = await request(app)
        .delete(`/api/v1/todo/${testTodo.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Todo deleted successfully');
    });
  });

  describe('GET /api/v1/todo/delete-all', () => {
    test('should delete all todos', async () => {
      await request(app)
        .post('/api/v1/todo')
        .send({ title: 'Todo 1', completed: false })
        .set('Authorization', `Bearer ${token}`);

      await request(app)
        .post('/api/v1/todo')
        .send({ title: 'Todo 2', completed: false })
        .set('Authorization', `Bearer ${token}`);

      const response = await request(app)
        .get('/api/v1/todo/delete-all')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Todos deleted successfully');
    });
  });
});
