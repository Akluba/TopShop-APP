export interface ICurrentUser {
    id: number;
    name: string;
    email: string;
    role?: string;
    access_token: string;
}