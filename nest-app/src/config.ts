export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: parseInt(process.env.DB_PORT, 10) || 5432,
  dbUser: process.env.POSTGRES_USER || 'otus',
  dbPass: process.env.POSTGRES_PASSWORD || 'otus',
  db: process.env.POSTGRES_DB || 'crm',
  jwtSecret: process.env.JWT_SECRET || 'secret',
});
