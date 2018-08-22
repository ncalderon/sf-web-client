import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITranCategorySf } from 'app/shared/model/tran-category-sf.model';

@Component({
    selector: 'sf-tran-category-sf-detail',
    templateUrl: './tran-category-sf-detail.component.html'
})
export class TranCategorySfDetailComponent implements OnInit {
    tranCategory: ITranCategorySf;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tranCategory }) => {
            this.tranCategory = tranCategory;
        });
    }

    previousState() {
        window.history.back();
    }
}
