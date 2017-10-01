import {Directive, ElementRef, HostListener, Input, Output} from '@angular/core';
import {Searcher} from "./searcher";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Directive({
    selector: '[jhiSearch]'
})
export class SearchDirective {

    @Input() searcher: Searcher;
    @Input() items: Observable<any[]>;
    private searchTerms = new Subject<string>();
    constructor(private el: ElementRef) {
        this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()
            .subscribe((term: string) => this.searcher.onSearch(term), (res: Response) => Observable.of<any[]>([]));
    }

    @HostListener("keyup") onKeyUp(){
        this.searchTerms.next(this.el.nativeElement.value);
        //this.searcher.onSearch(this.el.nativeElement.value);
    }


}
