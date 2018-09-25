import { Moment } from 'moment';
import { ITranEntrySf } from 'app/shared/model//tran-entry-sf.model';
import { IUser } from 'app/core/user/user.model';

export const enum FinAccStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE'
}

export interface IFinAccSf {
    id?: number;
    status?: FinAccStatus;
    accNum?: string;
    name?: string;
    description?: string;
    balance?: number;
    isCreditCard?: boolean;
    dueDate?: Moment;
    closingDate?: Moment;
    tranEntries?: ITranEntrySf[];
    user?: IUser;
}

export class FinAccSf implements IFinAccSf {
    constructor(
        public id?: number,
        public status?: FinAccStatus,
        public accNum?: string,
        public name?: string,
        public description?: string,
        public balance?: number,
        public isCreditCard?: boolean,
        public dueDate?: Moment,
        public closingDate?: Moment,
        public tranEntries?: ITranEntrySf[],
        public user?: IUser
    ) {
        this.isCreditCard = this.isCreditCard || false;
    }
}
