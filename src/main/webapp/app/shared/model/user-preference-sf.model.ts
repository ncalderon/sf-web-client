import { IUser } from 'app/core/user/user.model';
import { IPreferenceSf } from 'app/shared/model//preference-sf.model';

export interface IUserPreferenceSf {
    id?: number;
    value?: string;
    user?: IUser;
    preference?: IPreferenceSf;
}

export class UserPreferenceSf implements IUserPreferenceSf {
    constructor(public id?: number, public value?: string, public user?: IUser, public preference?: IPreferenceSf) {}
}
