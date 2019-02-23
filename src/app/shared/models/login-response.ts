import { User } from './user';

export interface ILoginResponse {
    accessToken: string;
    idToken: string;
    user: User;
}
