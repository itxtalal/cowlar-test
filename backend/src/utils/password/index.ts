import bcrypt from 'bcryptjs';

const generateHash = async (password: string): Promise<string> => {
  const saltRounds = process.env.SALT_ROUNDS ?? 10;

  const result = await bcrypt.hash(password, +saltRounds);

  return result;
};

export { generateHash };
