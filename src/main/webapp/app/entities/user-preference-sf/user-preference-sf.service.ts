import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserPreferenceSf } from 'app/shared/model/user-preference-sf.model';

type EntityResponseType = HttpResponse<IUserPreferenceSf>;
type EntityArrayResponseType = HttpResponse<IUserPreferenceSf[]>;

@Injectable({ providedIn: 'root' })
export class UserPreferenceSfService {
    private resourceUrl = SERVER_API_URL + 'api/user-preferences';

    constructor(private http: HttpClient) {}

    create(userPreference: IUserPreferenceSf): Observable<EntityResponseType> {
        return this.http.post<IUserPreferenceSf>(this.resourceUrl, userPreference, { observe: 'response' });
    }

    update(userPreference: IUserPreferenceSf): Observable<EntityResponseType> {
        return this.http.put<IUserPreferenceSf>(this.resourceUrl, userPreference, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUserPreferenceSf>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUserPreferenceSf[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
