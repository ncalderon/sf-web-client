import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TranCategoryRegexComponent } from './tran-category-regex.component';
import { TranCategoryRegexDetailComponent } from './tran-category-regex-detail.component';
import { TranCategoryRegexPopupComponent } from './tran-category-regex-dialog.component';
import { TranCategoryRegexDeletePopupComponent } from './tran-category-regex-delete-dialog.component';

@Injectable()
export class TranCategoryRegexResolvePagingParams implements Resolve<any> {

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

export const tranCategoryRegexRoute: Routes = [
    {
        path: 'tran-category-regex',
        component: TranCategoryRegexComponent,
        resolve: {
            'pagingParams': TranCategoryRegexResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.tranCategoryRegex.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tran-category-regex/:id',
        component: TranCategoryRegexDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.tranCategoryRegex.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tranCategoryRegexPopupRoute: Routes = [
    {
        path: 'tran-category-regex-new',
        component: TranCategoryRegexPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.tranCategoryRegex.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tran-category-regex/:id/edit',
        component: TranCategoryRegexPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.tranCategoryRegex.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tran-category-regex/:id/delete',
        component: TranCategoryRegexDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.tranCategoryRegex.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
