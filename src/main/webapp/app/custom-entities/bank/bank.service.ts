import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Bank } from './bank.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BankService {

    private resourceUrl = SERVER_API_URL + 'api/banks';

    constructor(private http: Http) { }

    create(bank: Bank): Observable<Bank> {
        const copy = this.convert(bank);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(bank: Bank): Observable<Bank> {
        const copy = this.convert(bank);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Bank> {
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

    private convert(bank: Bank): Bank {
        const copy: Bank = Object.assign({}, bank);
        return copy;
    }
}
