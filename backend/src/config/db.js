const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('MONGO_URI não definida no .env');
  }

  mongoose.connection.on('connected', () => {
    console.log('[db] conectado ao MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.error('[db] erro de conexão:', err.message);
  });

  await mongoose.connect(uri);
}

module.exports = { connectDB };
