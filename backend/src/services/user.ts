import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateHash } from '../utils/password';
import { faker } from '@faker-js/faker';
import { signAccessToken } from '../utils/token';

const prisma = new PrismaClient();

const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password ?? '');

    if (!isPasswordValid) {
      return null;
    }

    return user;
  } catch (error: any) {
    console.log('Login Service Error', error);
    throw new Error('Login Service Error');
  }
};

const getUsers = async (): Promise<
  { id: number; name: string; email: string }[] | null
> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return users;
  } catch (error: any) {
    console.log('Get Users Service Error', error);
    throw new Error('Get Users Service users');
  }
};

const getUserById = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  } catch (error: any) {
    console.log('Get User Error', error);
    throw new Error('Get Users Error');
  }
};

const createUser = async (email: string, password: string, name: string) => {
  try {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return null;
    }

    const hashedPassword = await generateHash(password);

    const createdUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return createdUser;
  } catch (error) {
    console.log('Create User SErvice Error', error);
    throw new Error('Create User Service');
  }
};

const updateUser = async (
  userId: number,
  password: string,
  name: string,
  currentUser: { id?: number }
) => {
  try {
    if (currentUser?.id !== userId) {
      return null;
    }

    const updateData: { password?: string; name?: string } = {};

    if (password) {
      const hashedPassword = await generateHash(password);
      updateData.password = hashedPassword;
    }

    if (name) {
      updateData.name = name;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return updatedUser;
  } catch (error) {
    console.log('Update User Service Error', error);
    throw new Error('Update User Service Error');
  }
};

const deleteUser = async (userId: number, currentUser: { id?: number }) => {
  try {
    if (currentUser?.id !== userId) {
      return null;
    }

    // Delete todos associated with the user
    const deletedTodos = await prisma.todo.deleteMany({
      where: {
        userId,
      },
    });

    // Delete the user
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    return deletedUser;
  } catch (error) {
    console.log('Delete User Service Error', error);
    throw new Error('Delete User Service Error');
  }
};

const createTestUser = async () => {
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

    return { ...user, password, token };
  } catch (error) {
    console.log('Create Test User Service Error', error);
    throw new Error('Create Test User Service Error');
  }
};

export {
  loginUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createTestUser,
};
