import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranCategorySf } from 'app/shared/model/tran-category-sf.model';
import { TranCategorySfService } from './tran-category-sf.service';
import { TranCategorySfComponent } from './tran-category-sf.component';
import { TranCategorySfDetailComponent } from './tran-category-sf-detail.component';
import { TranCategorySfUpdateComponent } from './tran-category-sf-update.component';
import { TranCategorySfDeletePopupComponent } from './tran-category-sf-delete-dialog.component';
import { ITranCategorySf } from 'app/shared/model/tran-category-sf.model';

@Injectable({ providedIn: 'root' })
export class TranCategorySfResolve implements Resolve<ITranCategorySf> {
    constructor(private service: TranCategorySfService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((tranCategory: HttpResponse<TranCategorySf>) => tranCategory.body));
        }
        return of(new TranCategorySf());
    }
}

export const tranCategoryRoute: Routes = [
    {
        path: 'tran-category-sf',
        component: TranCategorySfComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'sfwebApp.tranCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tran-category-sf/:id/view',
        component: TranCategorySfDetailComponent,
        resolve: {
            tranCategory: TranCategorySfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.tranCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tran-category-sf/new',
        component: TranCategorySfUpdateComponent,
        resolve: {
            tranCategory: TranCategorySfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.tranCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tran-category-sf/:id/edit',
        component: TranCategorySfUpdateComponent,
        resolve: {
            tranCategory: TranCategorySfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.tranCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tranCategoryPopupRoute: Routes = [
    {
        path: 'tran-category-sf/:id/delete',
        component: TranCategorySfDeletePopupComponent,
        resolve: {
            tranCategory: TranCategorySfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.tranCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
