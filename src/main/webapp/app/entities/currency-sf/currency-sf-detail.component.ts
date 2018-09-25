import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICurrencySf } from 'app/shared/model/currency-sf.model';

@Component({
    selector: 'sf-currency-sf-detail',
    templateUrl: './currency-sf-detail.component.html'
})
export class CurrencySfDetailComponent implements OnInit {
    currency: ICurrencySf;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ currency }) => {
            this.currency = currency;
        });
    }

    previousState() {
        window.history.back();
    }
}
