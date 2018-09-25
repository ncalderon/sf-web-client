import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITranCategorySf } from 'app/shared/model/tran-category-sf.model';

type EntityResponseType = HttpResponse<ITranCategorySf>;
type EntityArrayResponseType = HttpResponse<ITranCategorySf[]>;

@Injectable({ providedIn: 'root' })
export class TranCategorySfService {
    private resourceUrl = SERVER_API_URL + 'api/tran-categories';

    constructor(private http: HttpClient) {}

    create(tranCategory: ITranCategorySf): Observable<EntityResponseType> {
        return this.http.post<ITranCategorySf>(this.resourceUrl, tranCategory, { observe: 'response' });
    }

    update(tranCategory: ITranCategorySf): Observable<EntityResponseType> {
        return this.http.put<ITranCategorySf>(this.resourceUrl, tranCategory, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITranCategorySf>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITranCategorySf[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
