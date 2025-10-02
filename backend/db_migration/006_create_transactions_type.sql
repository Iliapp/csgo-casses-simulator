CREATE TYPE transaction_type AS ENUM ('buy','open');


CREATE TABLE transactions(
                             id SERIAL PRIMARY KEY,
                             user_id INT NOT NULL,
                             amount NUMERIC(12,2) NOT NULL,
                             type transaction_type NOT NULL,
                             created_at TIMESTAMP DEFAULT NOW(),
                             FOREIGN KEY (user_id) REFERENCES users(id)
);

