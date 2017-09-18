import { BaseEntity, User } from './../../shared';

export class Bank implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public bankAccounts?: BaseEntity[],
        public user?: User,
    ) {
    }
}
