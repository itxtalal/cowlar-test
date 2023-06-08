import bcrypt from 'bcryptjs';
import config from '../../config/app';

const generateHash = async (password: string): Promise<string> => {
  const saltRounds = config.saltRounds;

  const result = await bcrypt.hash(password, +saltRounds);

  return result;
};

export { generateHash };
