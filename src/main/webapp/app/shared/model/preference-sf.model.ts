import { IUserPreferenceSf } from 'app/shared/model//user-preference-sf.model';

export interface IPreferenceSf {
    id?: number;
    name?: string;
    value?: string;
    userPreferences?: IUserPreferenceSf[];
}

export class PreferenceSf implements IPreferenceSf {
    constructor(public id?: number, public name?: string, public value?: string, public userPreferences?: IUserPreferenceSf[]) {}
}
