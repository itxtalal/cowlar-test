import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  secretKey: process.env.SECRET_KEY || 'cowlar-test',
  tokenExpire: process.env.TOKEN_EXPIRE || '2h',
  saltRounds: process.env.SALT_ROUNDS || 10,
  databaseURL:
    process.env.DATABASE_URL ||
    'postgresql://admin:pass@localhost:5432/cowlar-test?schema=public',
};

export default config;
