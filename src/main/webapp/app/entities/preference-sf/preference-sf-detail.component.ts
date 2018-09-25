import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPreferenceSf } from 'app/shared/model/preference-sf.model';

@Component({
    selector: 'sf-preference-sf-detail',
    templateUrl: './preference-sf-detail.component.html'
})
export class PreferenceSfDetailComponent implements OnInit {
    preference: IPreferenceSf;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ preference }) => {
            this.preference = preference;
        });
    }

    previousState() {
        window.history.back();
    }
}
