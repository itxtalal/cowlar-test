import app from './app';
import config from './config/app';

const PORT = config.port;

try {
  app.listen(PORT, () => {
    console.log(`Server is listening to PORT ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
