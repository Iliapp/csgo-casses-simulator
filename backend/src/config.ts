export const config = {
    port: process.env.PORT || 5432,

    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,

    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: parseInt(process.env.DB_PORT || '5432'),
    DB_USER: process.env.DB_USER || 'user',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_DATABASE: process.env.DB_DATABASE || 'db-database',


};