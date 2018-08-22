import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserPreferenceSf } from 'app/shared/model/user-preference-sf.model';

@Component({
    selector: 'sf-user-preference-sf-detail',
    templateUrl: './user-preference-sf-detail.component.html'
})
export class UserPreferenceSfDetailComponent implements OnInit {
    userPreference: IUserPreferenceSf;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userPreference }) => {
            this.userPreference = userPreference;
        });
    }

    previousState() {
        window.history.back();
    }
}
