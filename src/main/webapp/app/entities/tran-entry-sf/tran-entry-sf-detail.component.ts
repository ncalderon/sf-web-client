import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITranEntrySf } from 'app/shared/model/tran-entry-sf.model';

@Component({
    selector: 'sf-tran-entry-sf-detail',
    templateUrl: './tran-entry-sf-detail.component.html'
})
export class TranEntrySfDetailComponent implements OnInit {
    tranEntry: ITranEntrySf;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tranEntry }) => {
            this.tranEntry = tranEntry;
        });
    }

    previousState() {
        window.history.back();
    }
}
