import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFinAccSf } from 'app/shared/model/fin-acc-sf.model';
import { FinAccSfService } from './fin-acc-sf.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'sf-fin-acc-sf-update',
    templateUrl: './fin-acc-sf-update.component.html'
})
export class FinAccSfUpdateComponent implements OnInit {
    private _finAcc: IFinAccSf;
    isSaving: boolean;

    users: IUser[];
    dueDateDp: any;
    closingDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private finAccService: FinAccSfService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ finAcc }) => {
            this.finAcc = finAcc;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.finAcc.id !== undefined) {
            this.subscribeToSaveResponse(this.finAccService.update(this.finAcc));
        } else {
            this.subscribeToSaveResponse(this.finAccService.create(this.finAcc));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFinAccSf>>) {
        result.subscribe((res: HttpResponse<IFinAccSf>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get finAcc() {
        return this._finAcc;
    }

    set finAcc(finAcc: IFinAccSf) {
        this._finAcc = finAcc;
    }
}
