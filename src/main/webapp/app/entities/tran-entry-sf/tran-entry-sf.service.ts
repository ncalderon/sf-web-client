import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITranEntrySf } from 'app/shared/model/tran-entry-sf.model';

type EntityResponseType = HttpResponse<ITranEntrySf>;
type EntityArrayResponseType = HttpResponse<ITranEntrySf[]>;

@Injectable({ providedIn: 'root' })
export class TranEntrySfService {
    private resourceUrl = SERVER_API_URL + 'api/tran-entries';

    constructor(private http: HttpClient) {}

    create(tranEntry: ITranEntrySf): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tranEntry);
        return this.http
            .post<ITranEntrySf>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(tranEntry: ITranEntrySf): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tranEntry);
        return this.http
            .put<ITranEntrySf>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITranEntrySf>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITranEntrySf[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(tranEntry: ITranEntrySf): ITranEntrySf {
        const copy: ITranEntrySf = Object.assign({}, tranEntry, {
            postDate: tranEntry.postDate != null && tranEntry.postDate.isValid() ? tranEntry.postDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.postDate = res.body.postDate != null ? moment(res.body.postDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((tranEntry: ITranEntrySf) => {
            tranEntry.postDate = tranEntry.postDate != null ? moment(tranEntry.postDate) : null;
        });
        return res;
    }
}
