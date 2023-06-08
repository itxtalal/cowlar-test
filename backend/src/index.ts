import app from './app';

const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, () => {
    console.log(`Server is listening to PORT ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
