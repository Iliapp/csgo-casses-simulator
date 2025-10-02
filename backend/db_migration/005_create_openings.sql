CREATE TABLE openings(
                         id SERIAL PRIMARY KEY,
                         user_id INT NOT NULL,
                         case_id INT NOT NULL,
                         item_id INT NOT NULL,
                         seed BIGINT,
                         outcome_hash TEXT,
                         created_at TIMESTAMP DEFAULT NOW(),
                         FOREIGN KEY (user_id) REFERENCES users(id),
                         FOREIGN KEY (case_id) REFERENCES cases(id),
                         FOREIGN KEY (item_id) REFERENCES items(id)
);
