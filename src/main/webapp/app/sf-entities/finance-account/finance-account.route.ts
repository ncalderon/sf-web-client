import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FinanceAccountComponent } from './finance-account.component';
import { FinanceAccountDetailComponent } from './finance-account-detail.component';
import { FinanceAccountPopupComponent } from './finance-account-dialog.component';
import { FinanceAccountDeletePopupComponent } from './finance-account-delete-dialog.component';

@Injectable()
export class FinanceAccountResolvePagingParams implements Resolve<any> {

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

export const financeAccountRoute: Routes = [
    {
        path: 'finance-account',
        component: FinanceAccountComponent,
        resolve: {
            'pagingParams': FinanceAccountResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.financeAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'finance-account/:id',
        component: FinanceAccountDetailComponent,
        resolve: {
            'pagingParams': FinanceAccountResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.financeAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const financeAccountPopupRoute: Routes = [
    {
        path: 'finance-account-new',
        component: FinanceAccountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.financeAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'finance-account/:id/edit',
        component: FinanceAccountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.financeAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'finance-account/:id/delete',
        component: FinanceAccountDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.financeAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
