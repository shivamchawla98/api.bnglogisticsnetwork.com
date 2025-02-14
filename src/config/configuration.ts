export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secure-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  database: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '8070',
    database: process.env.DB_DATABASE || 'db_bng',
    ssl: false,
  },
  session: {
    secret: process.env.SESSION_SECRET || 'your-secure-session-secret',
    expiresIn: parseInt(process.env.SESSION_EXPIRES_IN, 10) || 86400000, // 1 day in milliseconds
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
});
