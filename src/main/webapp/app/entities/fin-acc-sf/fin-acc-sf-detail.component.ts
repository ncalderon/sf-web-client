import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFinAccSf } from 'app/shared/model/fin-acc-sf.model';

@Component({
    selector: 'sf-fin-acc-sf-detail',
    templateUrl: './fin-acc-sf-detail.component.html'
})
export class FinAccSfDetailComponent implements OnInit {
    finAcc: IFinAccSf;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ finAcc }) => {
            this.finAcc = finAcc;
        });
    }

    previousState() {
        window.history.back();
    }
}
