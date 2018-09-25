import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFinAccSf } from 'app/shared/model/fin-acc-sf.model';

type EntityResponseType = HttpResponse<IFinAccSf>;
type EntityArrayResponseType = HttpResponse<IFinAccSf[]>;

@Injectable({ providedIn: 'root' })
export class FinAccSfService {
    private resourceUrl = SERVER_API_URL + 'api/fin-accs';

    constructor(private http: HttpClient) {}

    create(finAcc: IFinAccSf): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(finAcc);
        return this.http
            .post<IFinAccSf>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(finAcc: IFinAccSf): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(finAcc);
        return this.http
            .put<IFinAccSf>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFinAccSf>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFinAccSf[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(finAcc: IFinAccSf): IFinAccSf {
        const copy: IFinAccSf = Object.assign({}, finAcc, {
            dueDate: finAcc.dueDate != null && finAcc.dueDate.isValid() ? finAcc.dueDate.format(DATE_FORMAT) : null,
            closingDate: finAcc.closingDate != null && finAcc.closingDate.isValid() ? finAcc.closingDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dueDate = res.body.dueDate != null ? moment(res.body.dueDate) : null;
        res.body.closingDate = res.body.closingDate != null ? moment(res.body.closingDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((finAcc: IFinAccSf) => {
            finAcc.dueDate = finAcc.dueDate != null ? moment(finAcc.dueDate) : null;
            finAcc.closingDate = finAcc.closingDate != null ? moment(finAcc.closingDate) : null;
        });
        return res;
    }
}
