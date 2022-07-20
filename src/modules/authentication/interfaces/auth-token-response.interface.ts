import { User } from '@users/entities';

export interface IAuthTokenResponse {
    user: User;
    authToken: string;
}
