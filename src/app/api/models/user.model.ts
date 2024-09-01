export interface UsersWrapper {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    // ...
}