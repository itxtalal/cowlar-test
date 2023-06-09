import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests. Please try again later.',

  handler: (req, res, next, options) => {
    res.status(options.statusCode).send({
      msg: options.message,
    });
  },
});

export default rateLimiter;
