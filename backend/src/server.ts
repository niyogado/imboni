import { createApp } from './app';
import { config, validateConfig } from './config';
import { prisma } from './config/database';

validateConfig();

const app = createApp();

const server = app.listen(config.port, () => {
  console.log(`iMBONi backend running on ${config.baseUrl} (${config.nodeEnv})`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('HTTP server closed');
  });
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('HTTP server closed');
  });
  await prisma.$disconnect();
  process.exit(0);
});

export { app, server };