import {Injectable} from '@angular/core';
import {Principal} from '../../auth/principal.service';
import {User} from '../../';

@Injectable()
export class CurrencyUtilService {

    private currentUser: User;
    private baseCurrency: any;

    constructor(private principal: Principal) {
        this.principal.identity().then((user) => {
            this.currentUser = user;
            this.baseCurrency = JSON.parse(this.currentUser.currency.jsonVal);
        });
    }

    getCurrencyValue(rate) {
        return this.baseCurrency.rates[rate];
    }
}
