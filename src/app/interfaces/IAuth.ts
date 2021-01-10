import { Role } from './enums';

export interface IAuthStatus {
    role: Role,
    primarisid: number,
    unique_name: string;
}

export interface IServerAuthResponse {
    access_token: string
}