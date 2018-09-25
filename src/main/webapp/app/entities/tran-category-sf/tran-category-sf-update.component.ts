import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITranCategorySf } from 'app/shared/model/tran-category-sf.model';
import { TranCategorySfService } from './tran-category-sf.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'sf-tran-category-sf-update',
    templateUrl: './tran-category-sf-update.component.html'
})
export class TranCategorySfUpdateComponent implements OnInit {
    private _tranCategory: ITranCategorySf;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private tranCategoryService: TranCategorySfService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tranCategory }) => {
            this.tranCategory = tranCategory;
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
        if (this.tranCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.tranCategoryService.update(this.tranCategory));
        } else {
            this.subscribeToSaveResponse(this.tranCategoryService.create(this.tranCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITranCategorySf>>) {
        result.subscribe((res: HttpResponse<ITranCategorySf>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get tranCategory() {
        return this._tranCategory;
    }

    set tranCategory(tranCategory: ITranCategorySf) {
        this._tranCategory = tranCategory;
    }
}
