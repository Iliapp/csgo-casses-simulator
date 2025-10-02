CREATE TABLE case_items(
                           case_id INT NOT NULL,
                           item_id INT NOT NULL,
                           weight NUMERIC(5,2) DEFAULT 1,
                           PRIMARY KEY (case_id, item_id),
                           FOREIGN KEY (case_id) REFERENCES cases(id),
                           FOREIGN KEY (item_id) REFERENCES items(id)
);