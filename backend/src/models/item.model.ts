export interface ItemModel {
    id: string;
    name: string;
    rarity: "common" | "rare" | "classified" | "covert" | "legendary" | "contraband";
    wear: "battle-scarred" | "well-Worn" | "field-Tested" | "minimal Wear" | "factory New";
    price: number;
    additional_data: {
        image_url: string;
        collection: string;
    }
}