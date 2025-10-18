export interface CaseModel {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    created_at: string;
    metadata: {
        rarity_distribution: Record<string, number>; // chance
        is_active: boolean;
        total_opened: number;
        created_by: number | null;
    }
}