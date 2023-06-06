import { Schema } from 'express-validator';

export const createTodoSchema: Schema = {
  title: {
    isLength: {
      errorMessage: 'Title should be at least 3 chars long',
      options: { min: 3 },
    },
    notEmpty: true,
    errorMessage: 'Please enter a title',
  },
};

export const updateTodoSchema: Schema = {
  title: {
    isLength: {
      errorMessage: 'Title should be at least 3 chars long',
      options: { min: 3 },
    },
    notEmpty: true,
    errorMessage: 'Please enter a title',
  },
  completed: {
    isBoolean: true,
    errorMessage: 'Please enter a valid boolean value',
  },
};
