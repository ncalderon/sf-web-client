import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AccountTransactionComponent } from './account-transaction.component';
import { AccountTransactionDetailComponent } from './account-transaction-detail.component';
import { AccountTransactionPopupComponent } from './account-transaction-dialog.component';
import { AccountTransactionDeletePopupComponent } from './account-transaction-delete-dialog.component';

@Injectable()
export class AccountTransactionResolvePagingParams implements Resolve<any> {

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

export const accountTransactionRoute: Routes = [
    {
        path: 'account-transaction',
        component: AccountTransactionComponent,
        resolve: {
            'pagingParams': AccountTransactionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.accountTransaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'account-transaction/:id',
        component: AccountTransactionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.accountTransaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accountTransactionPopupRoute: Routes = [
    {
        path: 'account-transaction-new',
        component: AccountTransactionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.accountTransaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'account-transaction/:id/edit',
        component: AccountTransactionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.accountTransaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'account-transaction/:id/delete',
        component: AccountTransactionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.accountTransaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
