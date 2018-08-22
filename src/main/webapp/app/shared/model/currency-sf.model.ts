export interface ICurrencySf {
    id?: number;
    code?: string;
    name?: string;
    isDefault?: boolean;
    jsonval?: string;
}

export class CurrencySf implements ICurrencySf {
    constructor(public id?: number, public code?: string, public name?: string, public isDefault?: boolean, public jsonval?: string) {
        this.isDefault = this.isDefault || false;
    }
}
