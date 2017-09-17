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
    'ELECTRONIC_TRANSFER'
}

export class AccountTransaction implements BaseEntity {
    constructor(
        public id?: number,
        public tranType?: TranType,
        public tranNumber?: string,
        public referenceNumber?: string,
        public postDate?: any,
        public description?: string,
        public amount?: number,
        public paymentMethod?: PaymentMethod,
        public user?: User,
        public bankAccount?: BaseEntity,
        public tranCategory?: BaseEntity,
    ) {
    }
}
