import {Observable} from "rxjs/Observable";

export class Searcher {
    onSearch(term: string): Observable<any[]>{
        return Observable.of<any[]>([]);
    }
}
