import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../../app.constants';

import { TranCategoryRegex } from '../../sf-model/tran-category-regex.model';
import { ResponseWrapper, createRequestOption } from '../../index';

@Injectable()
export class TranCategoryRegexService {

    private resourceUrl = SERVER_API_URL + 'api/tran-category-regexes';

    constructor(private http: Http) { }

    create(tranCategoryRegex: TranCategoryRegex): Observable<TranCategoryRegex> {
        const copy = this.convert(tranCategoryRegex);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(tranCategoryRegex: TranCategoryRegex): Observable<TranCategoryRegex> {
        const copy = this.convert(tranCategoryRegex);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<TranCategoryRegex> {
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

    private convert(tranCategoryRegex: TranCategoryRegex): TranCategoryRegex {
        const copy: TranCategoryRegex = Object.assign({}, tranCategoryRegex);
        return copy;
    }
}
