import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITranEntrySf } from 'app/shared/model/tran-entry-sf.model';
import { TranEntrySfService } from './tran-entry-sf.service';
import { IUser, UserService } from 'app/core';
import { IFinAccSf } from 'app/shared/model/fin-acc-sf.model';
import { FinAccSfService } from 'app/entities/fin-acc-sf';
import { ITranCategorySf } from 'app/shared/model/tran-category-sf.model';
import { TranCategorySfService } from 'app/entities/tran-category-sf';

@Component({
    selector: 'sf-tran-entry-sf-update',
    templateUrl: './tran-entry-sf-update.component.html'
})
export class TranEntrySfUpdateComponent implements OnInit {
    private _tranEntry: ITranEntrySf;
    isSaving: boolean;

    users: IUser[];

    finaccs: IFinAccSf[];

    trancategories: ITranCategorySf[];
    postDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private tranEntryService: TranEntrySfService,
        private userService: UserService,
        private finAccService: FinAccSfService,
        private tranCategoryService: TranCategorySfService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tranEntry }) => {
            this.tranEntry = tranEntry;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.finAccService.query().subscribe(
            (res: HttpResponse<IFinAccSf[]>) => {
                this.finaccs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.tranCategoryService.query().subscribe(
            (res: HttpResponse<ITranCategorySf[]>) => {
                this.trancategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tranEntry.id !== undefined) {
            this.subscribeToSaveResponse(this.tranEntryService.update(this.tranEntry));
        } else {
            this.subscribeToSaveResponse(this.tranEntryService.create(this.tranEntry));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITranEntrySf>>) {
        result.subscribe((res: HttpResponse<ITranEntrySf>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFinAccById(index: number, item: IFinAccSf) {
        return item.id;
    }

    trackTranCategoryById(index: number, item: ITranCategorySf) {
        return item.id;
    }
    get tranEntry() {
        return this._tranEntry;
    }

    set tranEntry(tranEntry: ITranEntrySf) {
        this._tranEntry = tranEntry;
    }
}
