import {Injectable} from '@angular/core';
import {Http, Response,  URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {SERVER_API_URL} from '../../app.constants';
import {AccountTransaction} from './account-transaction.model';
import {createRequestOption, ResponseWrapper} from '../../shared';
import {JhiDateUtils} from 'ng-jhipster';

@Injectable()
export class AccountTransactionService {

    private resourceUrl = SERVER_API_URL + 'api/account-transactions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) {
    }

    create(accountTransaction: AccountTransaction): Observable<AccountTransaction> {
        const copy = this.convert(accountTransaction);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    createBulk(transactions: AccountTransaction[]): Observable<AccountTransaction[]> {
        const copy = this.convertArray(transactions);
        return this.http.post(this.resourceUrl + "/bulk", copy).map((res: Response) => {
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

    private convertItemsFromServer(accountTransactions: AccountTransaction[]) {
        for (let tran of accountTransactions) {
            this.convertItemFromServer(tran);
        }
    }

    private convertItemFromServer(entity: any) {
        entity.postDate = this.dateUtils
            .convertLocalDateFromServer(entity.postDate);
    }

    private convert(accountTransaction: AccountTransaction): AccountTransaction {
        const copy: AccountTransaction = Object.assign({}, accountTransaction);
        copy.postDate = this.dateUtils.convertLocalDateToServer(accountTransaction.postDate);
        return copy;
    }

    private convertArray(accountTransactions: AccountTransaction[]): AccountTransaction[] {
        const copyTrans: AccountTransaction[] = [];
        for (let tran of accountTransactions) {
            copyTrans.push(this.convert(tran));
        }
        return copyTrans;
    }

    findTransactionsByAccounts(accountsId: number[]): Observable<AccountTransaction[]> {
        return this.findTransactionsByAccountsAndYear(accountsId, 0);
    }

    findTransactionsByAccountsAndYear(accountsId: number[], year: number): Observable<AccountTransaction[]> {
        const options = createRequestOption();
        const params: URLSearchParams = new URLSearchParams();
        params.set('accountsId', <any>accountsId);
        params.set('year', year + '');
        options.params = params;
        return this.http.get(`${this.resourceUrl}/findByAccountsIdAndYear`, options).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertTransactionsFromServer(jsonResponse);
            return jsonResponse;
        });
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
}
