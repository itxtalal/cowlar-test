import { NextFunction, Request, Response } from 'express';
import { signAccessToken } from '../utils/token';
import * as userService from '../services/user';

// Login User
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await userService.loginUser(email, password);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
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
    const users = await userService.getUsers();

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
    const user = await userService.getUserById(parseInt(id));

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
    const createdUser = await userService.createUser(email, password, name);

    if (!createdUser) {
      return res.status(409).json({
        message: 'User already exists',
        status: 'FAILED',
      });
    }

    const { password: _, ...userWithoutPassword } = createdUser;

    const token = signAccessToken(createdUser);

    res.status(201).json({
      user: userWithoutPassword,
      message: 'User created successfully',
      status: 'SUCCESS',
      token,
    });
  } catch (error) {
    console.log(error);
    next('Error creating user');
  }
};

// Update a user by ID
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { password, name } = req.body;
  try {
    const userId = parseInt(id);

    const updatedUser = await userService.updateUser(
      userId,
      password,
      name,
      req.user!
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found or you are not authorized to update this user',
        status: 'FAILED',
      });
    }

    const { password: _, ...userWithoutPassword } = updatedUser;

    res.status(200).json({
      user: userWithoutPassword,
      message: 'User updated successfully',
      status: 'SUCCESS',
    });
  } catch (error) {
    console.log(error);
    next('Error updating user');
  }
};

// Delete a user by ID
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const userId = parseInt(id);

    // req,user is always going to be here if passed through the auth middleware
    const deletedUser = await userService.deleteUser(userId, req.user!);

    if (!deletedUser) {
      return res.status(404).json({
        message: 'User not found or you are not authorized to delete this user',
        status: 'FAILED',
      });
    }

    res.status(200).json({
      user: deletedUser,
      message: 'User deleted successfully',
      status: 'SUCCESS',
    });
  } catch (error) {
    console.log(error);
    next('Error deleting user');
  }
};

// Create a test user
const createTestUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdUser = await userService.createTestUser();

    res.status(201).json({
      user: createdUser,
      message: 'User created successfully',
      status: 'SUCCESS',
      token: createdUser.token,
    });
  } catch (error) {
    console.log(error);
    next('Error creating user');
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
