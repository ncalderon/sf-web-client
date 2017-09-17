import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BankAccountComponent } from './bank-account.component';
import { BankAccountDetailComponent } from './bank-account-detail.component';
import { BankAccountPopupComponent } from './bank-account-dialog.component';
import { BankAccountDeletePopupComponent } from './bank-account-delete-dialog.component';

@Injectable()
export class BankAccountResolvePagingParams implements Resolve<any> {

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

export const bankAccountRoute: Routes = [
    {
        path: 'bank-account',
        component: BankAccountComponent,
        resolve: {
            'pagingParams': BankAccountResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.bankAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bank-account/:id',
        component: BankAccountDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.bankAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankAccountPopupRoute: Routes = [
    {
        path: 'bank-account-new',
        component: BankAccountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.bankAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank-account/:id/edit',
        component: BankAccountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.bankAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank-account/:id/delete',
        component: BankAccountDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.bankAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
