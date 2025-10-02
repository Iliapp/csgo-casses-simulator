CREATE TYPE rarity_enum AS ENUM ('Common', 'Uncommon', 'Rare', 'Very Rare', 'Classified', 'Covert', 'Knife');
CREATE TYPE wear_enum AS ENUM ('battle_scared', 'well_worn','field_tested', 'minimal_wear', 'factory_new');

CREATE TABLE items(
                      id SERIAL PRIMARY KEY,
                      name TEXT,
                      rarity rarity_enum,
                      wear wear_enum,
                      image_url TEXT,
                      float_min NUMERIC(5,4),
                      float_max NUMERIC(5,4),
                      created_at TIMESTAMP DEFAULT NOW()
);

