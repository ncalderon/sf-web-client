import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPreferenceSf } from 'app/shared/model/preference-sf.model';
import { PreferenceSfService } from './preference-sf.service';

@Component({
    selector: 'sf-preference-sf-update',
    templateUrl: './preference-sf-update.component.html'
})
export class PreferenceSfUpdateComponent implements OnInit {
    private _preference: IPreferenceSf;
    isSaving: boolean;

    constructor(private preferenceService: PreferenceSfService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ preference }) => {
            this.preference = preference;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.preference.id !== undefined) {
            this.subscribeToSaveResponse(this.preferenceService.update(this.preference));
        } else {
            this.subscribeToSaveResponse(this.preferenceService.create(this.preference));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPreferenceSf>>) {
        result.subscribe((res: HttpResponse<IPreferenceSf>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get preference() {
        return this._preference;
    }

    set preference(preference: IPreferenceSf) {
        this._preference = preference;
    }
}
