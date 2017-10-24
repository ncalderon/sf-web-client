import { BaseEntity, User } from './../../shared';

export const enum AccountStatus {
    'INACTIVE',
    'ACTIVE'
}

export class FinanceAccount implements BaseEntity {
    constructor(
        public id?: number,
        public accountStatus?: AccountStatus,
        public accountNumber?: string,
        public name?: string,
        public description?: string,
        public balance?: number,
        public isCreditCard?: boolean,
        public dueDate?: any,
        public closingDate?: any,
        public accountTransactions?: BaseEntity[],
        public user?: User,
    ) {
        this.isCreditCard = false;
    }
}
