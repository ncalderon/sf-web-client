import { BaseEntity, User } from './../../shared';

export const enum TranType {
    'EXPENSE',
    'INCOME'
}

export const enum PaymentMethod {
    'UNSPECIFIED',
    'CASH',
    'CHECK',
    'CREDIT_CARD',
    'DEBIT',
    'ELECTRONIC_TRANSFER',
    'OTHER'
}

export class AccountTransaction implements BaseEntity {
    constructor(
        public id?: number,
        public tranType?: TranType,
        public tranNumber?: string,
        public referenceNumber?: string,
        public postDate?: any,
        public createdDate?: any,
        public description?: string,
        public amount?: number,
        public paymentMethod?: PaymentMethod,
        public user?: User,
        public financeAccount?: BaseEntity,
        public tranCategory?: BaseEntity,
    ) {
    }
}
