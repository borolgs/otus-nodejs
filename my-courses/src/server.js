require('colors');
const { port } = require('./config');
const app = require('./app');
const connectDB = require('./db');

async function start() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`.blue.underline.bold);
  });
}

process.on('uncaughtException', err => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});

start();
