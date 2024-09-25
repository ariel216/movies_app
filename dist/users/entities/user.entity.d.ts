export declare enum UserRoleEnum {
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare class User {
    id: number;
    login: string;
    password: string;
    fullname: string;
    email: string;
    phone: string;
    role: UserRoleEnum;
    last_access: Date | null;
    enabled: boolean;
    created_at: Date;
    updated_at: Date;
}
