import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AccountTransaction } from './account-transaction.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AccountTransactionService {

    private resourceUrl = SERVER_API_URL + 'api/account-transactions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(accountTransaction: AccountTransaction): Observable<AccountTransaction> {
        const copy = this.convert(accountTransaction);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(accountTransaction: AccountTransaction): Observable<AccountTransaction> {
        const copy = this.convert(accountTransaction);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<AccountTransaction> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
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
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.postDate = this.dateUtils
            .convertDateTimeFromServer(entity.postDate);
    }

    private convert(accountTransaction: AccountTransaction): AccountTransaction {
        const copy: AccountTransaction = Object.assign({}, accountTransaction);

        copy.postDate = this.dateUtils.toDate(accountTransaction.postDate);
        return copy;
    }
}
