import { BaseEntity, User } from '../index';

export class TranCategory implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public transactions?: BaseEntity[],
        public user?: User,
        public tranCategoryRegex?: BaseEntity,
    ) {
    }
}
