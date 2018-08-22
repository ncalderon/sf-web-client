import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICurrencySf } from 'app/shared/model/currency-sf.model';

type EntityResponseType = HttpResponse<ICurrencySf>;
type EntityArrayResponseType = HttpResponse<ICurrencySf[]>;

@Injectable({ providedIn: 'root' })
export class CurrencySfService {
    private resourceUrl = SERVER_API_URL + 'api/currencies';

    constructor(private http: HttpClient) {}

    create(currency: ICurrencySf): Observable<EntityResponseType> {
        return this.http.post<ICurrencySf>(this.resourceUrl, currency, { observe: 'response' });
    }

    update(currency: ICurrencySf): Observable<EntityResponseType> {
        return this.http.put<ICurrencySf>(this.resourceUrl, currency, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICurrencySf>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICurrencySf[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
