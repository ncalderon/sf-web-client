import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TranCategoryComponent } from './tran-category.component';
import { TranCategoryDetailComponent } from './tran-category-detail.component';
import { TranCategoryPopupComponent } from './tran-category-dialog.component';
import { TranCategoryDeletePopupComponent } from './tran-category-delete-dialog.component';

@Injectable()
export class TranCategoryResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const tranCategoryRoute: Routes = [
    {
        path: 'tran-category',
        component: TranCategoryComponent,
        resolve: {
            'pagingParams': TranCategoryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.tranCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tran-category/:id',
        component: TranCategoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.tranCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tranCategoryPopupRoute: Routes = [
    {
        path: 'tran-category-new',
        component: TranCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.tranCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tran-category/:id/edit',
        component: TranCategoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.tranCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tran-category/:id/delete',
        component: TranCategoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.tranCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
