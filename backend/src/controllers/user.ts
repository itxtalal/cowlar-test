import { NextFunction, Request, Response } from 'express';
import prisma from '../utils/prisma';
import { generateHash } from '../utils/password';
import { signAccessToken } from '../utils/token';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

// Login User
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        status: 'FAILED',
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password ?? '');

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials',
        status: 'FAILED',
      });
    }

    const token = signAccessToken(user);

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      user: userWithoutPassword,
      message: 'User logged in successfully',
      status: 'SUCCESS',
      token,
    });
  } catch (error) {
    console.log(error);
    next('Error logging in user');
  }
};

// Get all users
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.status(200).json({
      users,
      message: 'Users retrieved successfully',
      status: 'SUCCESS',
    });
  } catch (error) {
    next('Error retrieving users');
  }
};

// Get a single user by ID
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const userId = parseInt(id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        status: 'FAILED',
      });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      user: userWithoutPassword,
      message: 'User retrieved successfully',
      status: 'SUCCESS',
    });
  } catch (error) {
    next('Error retrieving user');
  }
};

// Create a new user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(409).json({
        message: 'User already exists',
        status: 'FAILED',
      });
    }

    const hashedPassword = await generateHash(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      user: userWithoutPassword,
      message: 'User created successfully',
      status: 'SUCCESS',
    });
  } catch (error) {
    console.log(error);
    next('Error creating users');
  }
};

// Update a user by ID
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { password, name } = req.body;
  try {
    const userId = parseInt(id);

    if (req.user?.id !== userId) {
      return res.status(403).json({
        message: 'You are not authorized to perform this action',
        status: 'FAILED',
      });
    }

    const updateData: { password?: string; name?: string } = {};

    if (password) {
      const hashedPassword = await generateHash(password);
      updateData.password = hashedPassword;
    }

    if (name) {
      updateData.name = name;
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      user: userWithoutPassword,
      message: 'User updated successfully',
      status: 'SUCCESS',
    });
  } catch (error) {
    next('Error updating users');
  }
};

// Delete a user by ID
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const userId = parseInt(id);

    if (req.user?.id !== userId) {
      return res.status(403).json({
        message: 'You are not authorized to perform this action',
        status: 'FAILED',
      });
    }

    // also delete todos
    const todos = await prisma.todo.deleteMany({
      where: {
        userId,
      },
    });

    const user = await prisma.user.delete({
      where: { id: userId },
    });

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({
      user: userWithoutPassword,
      todos,
      message: 'User deleted successfully',
      status: 'SUCCESS',
    });
  } catch (error) {
    next('Error deleting users');
  }
};

// Create a test user
const createTestUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const password = faker.internet.password();
    const hashedPassword = await generateHash(password);

    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: hashedPassword,
        name: faker.person.fullName(),
      },
    });

    const token = signAccessToken(user);

    res.status(201).json({
      user: { ...user, password },
      message: 'User created successfully',
      status: 'SUCCESS',
      token,
    });
  } catch (error) {
    console.log(error);
    next('Error creating users');
  }
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  createTestUser,
};
