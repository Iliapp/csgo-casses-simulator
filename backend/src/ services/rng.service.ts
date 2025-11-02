import DatabaseService from "./database.service.js";

export class RNGService {
    private db: DatabaseService;

    constructor() {
        this.db = new DatabaseService();
    }

    async openCase(caseId: number, userId: number) {
        const client = await this.db.pool.connect();

        try {
            await client.query("BEGIN");

            const userRes = await client.query(
                `SELECT balance FROM users WHERE id = $1 FOR UPDATE`,
                [userId]
            );
            const caseRes = await client.query(
                `SELECT price FROM cases WHERE id = $1`,
                [caseId]
            );

            if (userRes.rows.length === 0) throw new Error("User not found");
            if (caseRes.rows.length === 0) throw new Error("Case not found");

            const balance = userRes.rows[0].balance;
            const price = caseRes.rows[0].price;

            if (balance < price) throw new Error("Not enough balance to open case");

            const { rows } = await client.query(
                `SELECT i.*, ci.chance
                 FROM case_items ci
                          JOIN items i ON ci.item_id = i.id
                 WHERE ci.case_id = $1`,
                [caseId]
            );

            if (rows.length === 0) throw new Error("This case has no items");

            const totalChance = rows.reduce((sum, item) => sum + item.chance, 0);
            if (totalChance <= 0) throw new Error("Invalid chance configuration");

            const normalized = rows.map((i) => ({
                ...i,
                chance: i.chance / totalChance,
            }));

            const random = Math.random();
            let cumulative = 0;
            let selectedItem = normalized[0];

            for (const item of normalized) {
                cumulative += item.chance;
                if (random <= cumulative) {
                    selectedItem = item;
                    break;
                }
            }

            await client.query(
                `UPDATE users SET balance = balance - $1 WHERE id = $2`,
                [price, userId]
            );

            await client.query(
                `INSERT INTO openings (user_id, case_id, item_id, opened_at, roll)
                 VALUES ($1, $2, $3, NOW(), $4)`,
                [userId, caseId, selectedItem.id, random]
            );

            await client.query(
                `UPDATE cases
                 SET metadata = jsonb_set(
                         COALESCE(metadata, '{}'::jsonb),
                         '{total_opened}',
                         (
                             (COALESCE((metadata->>'total_opened')::int, 0) + 1)::text
                     )::jsonb
                 )
                 WHERE id = $1`,
                [caseId]
            );

            await client.query("COMMIT");

            return {
                success: true,
                randomValue: random.toFixed(4),
                item: {
                    id: selectedItem.id,
                    name: selectedItem.name,
                    rarity: selectedItem.rarity,
                    price: selectedItem.price,
                    image: selectedItem.additional_data?.image_url,
                },
            };
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }
}

export default RNGService;
