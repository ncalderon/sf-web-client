import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../../app.constants';

import { Currency } from '../../sf-model/currency.model';
import { ResponseWrapper, createRequestOption } from '../../index';

@Injectable()
export class CurrencyService {

    private resourceUrl = SERVER_API_URL + 'api/currencies';

    constructor(private http: Http) { }

    create(currency: Currency): Observable<Currency> {
        const copy = this.convert(currency);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(currency: Currency): Observable<Currency> {
        const copy = this.convert(currency);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Currency> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(currency: Currency): any {
        const copy: any = Object.assign({}, currency);
        copy['default'] = JSON.stringify(copy.isDefault);
        delete copy.isDefault;
        return copy;
    }
}
