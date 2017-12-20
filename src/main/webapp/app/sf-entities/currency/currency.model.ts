import { BaseEntity } from './../../shared';

export class Currency implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public createdDate?: string,
        public isDefault?: boolean,
        public rates?: any
    ) {
    }
}
