import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUserPreferenceSf } from 'app/shared/model/user-preference-sf.model';
import { UserPreferenceSfService } from './user-preference-sf.service';
import { IUser, UserService } from 'app/core';
import { IPreferenceSf } from 'app/shared/model/preference-sf.model';
import { PreferenceSfService } from 'app/entities/preference-sf';

@Component({
    selector: 'sf-user-preference-sf-update',
    templateUrl: './user-preference-sf-update.component.html'
})
export class UserPreferenceSfUpdateComponent implements OnInit {
    private _userPreference: IUserPreferenceSf;
    isSaving: boolean;

    users: IUser[];

    preferences: IPreferenceSf[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private userPreferenceService: UserPreferenceSfService,
        private userService: UserService,
        private preferenceService: PreferenceSfService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userPreference }) => {
            this.userPreference = userPreference;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.preferenceService.query().subscribe(
            (res: HttpResponse<IPreferenceSf[]>) => {
                this.preferences = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.userPreference.id !== undefined) {
            this.subscribeToSaveResponse(this.userPreferenceService.update(this.userPreference));
        } else {
            this.subscribeToSaveResponse(this.userPreferenceService.create(this.userPreference));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUserPreferenceSf>>) {
        result.subscribe((res: HttpResponse<IUserPreferenceSf>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackPreferenceById(index: number, item: IPreferenceSf) {
        return item.id;
    }
    get userPreference() {
        return this._userPreference;
    }

    set userPreference(userPreference: IUserPreferenceSf) {
        this._userPreference = userPreference;
    }
}
