import { Schema } from 'express-validator';

export const createUserSchema: Schema = {
  email: {
    isEmail: true,
    notEmpty: true,
    errorMessage: 'Invalid email',
  },
  password: {
    isLength: {
      errorMessage: 'Password should be at least 3 chars long',
      // Multiple options would be expressed as an array
      options: { min: 3 },
    },
    notEmpty: true,
    errorMessage: 'Please enter a password',
  },
  name: {
    isLength: {
      errorMessage: 'Name should be at least 3 chars long',
      // Multiple options would be expressed as an array
      options: { min: 3, max: 20 },
    },
    notEmpty: true,
    errorMessage: 'Please enter a name',
  },
};

export const updateUserSchema: Schema = {
  password: {
    optional: true,
    isLength: {
      errorMessage: 'Password should be at least 3 chars long',
      // Multiple options would be expressed as an array
      options: { min: 3 },
    },
    errorMessage: 'Please enter a password',
  },
  name: {
    optional: true,
    isLength: {
      errorMessage: 'Name should be at least 3 chars long',
      // Multiple options would be expressed as an array
      options: { min: 3, max: 20 },
    },
    errorMessage: 'Please enter a name',
  },
};
