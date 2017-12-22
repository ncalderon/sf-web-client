import { BaseEntity } from '../index';

export class Currency implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public createdDate?: string,
        public isDefault?: boolean,
        public jsonVal?: any
    ) {
    }
}
