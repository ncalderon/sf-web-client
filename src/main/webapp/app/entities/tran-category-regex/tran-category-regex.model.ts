import { BaseEntity, User } from './../../shared';

export class TranCategoryRegex implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public regex?: string,
        public tranCategories?: BaseEntity[],
        public user?: User,
    ) {
    }
}
