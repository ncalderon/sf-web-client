import { BaseEntity, User } from './../../shared';

export const enum AccountStatus {
    'INACTIVE',
    'ACTIVE',
    'DISABLED'
}

export const enum AccountType {
    'CHECKING_ACCOUNT',
    'SAVING_ACCOUNT',
    'CREDIT_CARD'
}

export class BankAccount implements BaseEntity {
    constructor(
        public id?: number,
        public accountStatus?: AccountStatus,
        public accountType?: AccountType,
        public accountNumber?: string,
        public name?: string,
        public description?: string,
        public balance?: number,
        public accountTransactions?: BaseEntity[],
        public user?: User,
        public bank?: BaseEntity,
    ) {
    }
}
