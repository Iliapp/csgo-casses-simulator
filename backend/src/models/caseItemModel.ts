export interface CaseItemModel {
    caseId: number;
    itemId: number;
    chance: number;
    join_items: {
        name?: string;
        rarity?: string;
        price?:string;
        image_url?: string;

    }
}