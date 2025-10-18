export interface UserModel {
    id: number;
    email: string;
    password: string;
    name: string;
    balance: number;
    role: "user" | "admin";
    created_at: string;
    last_login: string | null;
    additional_data: {
        avatar_url: string;
        is_banned: boolean;
    }


}