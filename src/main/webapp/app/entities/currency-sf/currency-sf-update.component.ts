import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICurrencySf } from 'app/shared/model/currency-sf.model';
import { CurrencySfService } from './currency-sf.service';

@Component({
    selector: 'sf-currency-sf-update',
    templateUrl: './currency-sf-update.component.html'
})
export class CurrencySfUpdateComponent implements OnInit {
    private _currency: ICurrencySf;
    isSaving: boolean;

    constructor(private currencyService: CurrencySfService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ currency }) => {
            this.currency = currency;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.currency.id !== undefined) {
            this.subscribeToSaveResponse(this.currencyService.update(this.currency));
        } else {
            this.subscribeToSaveResponse(this.currencyService.create(this.currency));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICurrencySf>>) {
        result.subscribe((res: HttpResponse<ICurrencySf>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get currency() {
        return this._currency;
    }

    set currency(currency: ICurrencySf) {
        this._currency = currency;
    }
}
