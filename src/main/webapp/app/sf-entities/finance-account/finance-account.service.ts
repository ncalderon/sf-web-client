import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {FinanceAccount} from './finance-account.model';
import {createRequestOption, ResponseWrapper} from '../../shared';
import {AccountTransaction} from '../account-transaction/account-transaction.model';
import {HttpObserve} from '@angular/common/http/src/client';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class FinanceAccountService {

    private resourceUrl = SERVER_API_URL + 'api/finance-accounts';

    constructor(private http: Http, private dateUtils: JhiDateUtils) {
    }

    create(financeAccount: FinanceAccount): Observable<FinanceAccount> {
        const copy = this.convert(financeAccount);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(financeAccount: FinanceAccount): Observable<FinanceAccount> {
        const copy = this.convert(financeAccount);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<FinanceAccount> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    findTransactions(id: number): Observable<AccountTransaction[]> {
        return this.findTransactionsByYear(id, 0);
    }

    findTransactionsByYear(id: number, year: number): Observable<AccountTransaction[]> {
        return this.http.get(`${this.resourceUrl}/${id}/transactionsByYear`, {
            params: new HttpParams().set('year', year + '')
        }).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertTransactionsFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryTransactions(id: number, req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(`${this.resourceUrl}/${id}/transactions`, options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryTransactions(id: number, req?: any, filter?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(`${this.resourceUrl}/${id}/transactions`, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertTransactionsFromServer(accountTransactions: AccountTransaction[]) {
        for (let tran of accountTransactions) {
            this.convertTransactionFromServer(tran);
        }
    }

    private convertTransactionFromServer(entity: any) {
        entity.postDate = this.dateUtils
            .convertLocalDateFromServer(entity.postDate);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertTranResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertTranFromServer(entity: any) {
        entity.postDate = this.dateUtils
            .convertLocalDateFromServer(entity.postDate);
        entity.createdDate = this.dateUtils
            .convertLocalDateFromServer(entity.createdDate);
    }

    private convertItemFromServer(entity: any) {
        entity.dueDate = this.dateUtils
            .convertLocalDateFromServer(entity.dueDate);
        entity.closingDate = this.dateUtils
            .convertLocalDateFromServer(entity.closingDate);
    }

    private convert(financeAccount: FinanceAccount): FinanceAccount {
        const copy: FinanceAccount = Object.assign({}, financeAccount);
        copy.dueDate = this.dateUtils
            .convertLocalDateToServer(financeAccount.dueDate);
        copy.closingDate = this.dateUtils
            .convertLocalDateToServer(financeAccount.closingDate);
        return copy;
    }
}
