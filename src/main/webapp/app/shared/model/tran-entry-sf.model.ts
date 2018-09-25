import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IFinAccSf } from 'app/shared/model//fin-acc-sf.model';
import { ITranCategorySf } from 'app/shared/model//tran-category-sf.model';

export const enum TranType {
    EXPENSE = 'EXPENSE',
    INCOME = 'INCOME'
}

export const enum PaymentMethod {
    UNSPECIFIED = 'UNSPECIFIED',
    CASH = 'CASH',
    CHECK = 'CHECK',
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT = 'DEBIT',
    ELECTRONIC_TRANSFER = 'ELECTRONIC_TRANSFER',
    OTHER = 'OTHER'
}

export interface ITranEntrySf {
    id?: number;
    tranType?: TranType;
    tranNum?: string;
    refNum?: string;
    postDate?: Moment;
    description?: string;
    amount?: number;
    ccyVal?: number;
    ccyCode?: string;
    paymentMethod?: PaymentMethod;
    user?: IUser;
    finAcc?: IFinAccSf;
    tranCategory?: ITranCategorySf;
}

export class TranEntrySf implements ITranEntrySf {
    constructor(
        public id?: number,
        public tranType?: TranType,
        public tranNum?: string,
        public refNum?: string,
        public postDate?: Moment,
        public description?: string,
        public amount?: number,
        public ccyVal?: number,
        public ccyCode?: string,
        public paymentMethod?: PaymentMethod,
        public user?: IUser,
        public finAcc?: IFinAccSf,
        public tranCategory?: ITranCategorySf
    ) {}
}
