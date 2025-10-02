CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       email TEXT UNIQUE NOT NULL,
                       password_hash TEXT NOT NULL,
                       display_name TEXT,
                       balance NUMERIC(12,2) DEFAULT 0,
                       created_at TIMESTAMP DEFAULT  NOW(),
                       role TEXT DEFAULT 'user'
);