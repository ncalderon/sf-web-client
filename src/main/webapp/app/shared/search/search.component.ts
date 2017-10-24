import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Component({
    selector: 'jhi-search',
    templateUrl: './search.component.html',
    providers: []
})
export class HeroSearchComponent implements OnInit {
    items: Observable<any[]>;
    private searchTerms = new Subject<string>();

    constructor() {}

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.items = this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time the term changes
                // return the http search observable
                ? this.searchAysnc(term)
                // or the observable of empty heroes if there was no search term
                : Observable.of<any[]>([]))
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<any[]>([]);
            });
    }

    private searchAysnc(term: string): Observable<any[]> {
        return Observable.of<any[]>([]);
    }
}
