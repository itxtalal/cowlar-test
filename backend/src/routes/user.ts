import express, { Request, Response } from 'express';
import {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
  createTestUser,
} from '../controllers/user';
import { checkSchema } from 'express-validator';
import { createUserSchema, updateUserSchema } from '../schemas/user';
import { validateSchema } from '../utils/middlewares/validateSchema';
import verifyJWT from '../utils/middlewares/verifyJWT';

const router = express.Router();

// POST /api/v1/user/login
router.post('/login', loginUser);

// GET /api/v1/user/me
router.get('/me', verifyJWT, (req: Request, res: Response) => {
  const { password: _, ...userWithoutPassword } = req.user as any;

  return res.status(200).json({
    user: userWithoutPassword,
    status: 'SUCCESS',
    message: 'User token verified',
  });
});

// GET /api/v1/user/test
router.get('/test', createTestUser);

// POST /api/v1/user
router.post('/', checkSchema(createUserSchema), validateSchema, createUser);

// GET /api/v1/user
router.get('/', verifyJWT, getUsers);

// GET /api/v1/user:id
router.get('/:id', verifyJWT, getUserById);

// PUT /api/v1/user/:id
router.put(
  '/:id',
  verifyJWT,
  checkSchema(updateUserSchema),
  validateSchema,
  updateUser
);

// DELETE /api/v1/user/:id
router.delete('/:id', verifyJWT, deleteUser);

export default router;
