import { ITranEntrySf } from 'app/shared/model//tran-entry-sf.model';
import { IUser } from 'app/core/user/user.model';

export interface ITranCategorySf {
    id?: number;
    name?: string;
    description?: string;
    tranEntries?: ITranEntrySf[];
    user?: IUser;
}

export class TranCategorySf implements ITranCategorySf {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public tranEntries?: ITranEntrySf[],
        public user?: IUser
    ) {}
}
