require('dotenv').config();

const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 3000;

async function start() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`[server] rodando em http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('[server] falha ao iniciar:', err);
  process.exit(1);
});
