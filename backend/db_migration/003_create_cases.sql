CREATE TABLE cases (
                       id SERIAL PRIMARY KEY,
                       name TEXT,
                       price NUMERIC(12,2),
                       description TEXT,
                       image TEXT,
                       created_at TIMESTAMP DEFAULT NOW()
);