import { CorsOptions } from 'cors';

const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else
      callback(
        new Error(
          'Access to this resource is not allowed from the current origin.'
        )
      );
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
