import {UserRouteAccessService} from '../../../shared/auth/user-route-access-service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';
import {Injectable} from '@angular/core';
import {TransactionUploadComponent} from './transaction-upload/transaction-upload.component';
import {TransactionComponent} from './transaction.component';
import {TransactionPopupComponent} from './transaction-dialog/transaction-dialog.component';
import {TransactionDeletePopupComponent} from './transaction-delete-dialog/transaction-delete-dialog.component';

@Injectable()
export class TransactionResolvePagingParams implements Resolve<any> {

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

export const transactionRoute: Routes = [
    {
        path: 'finance-account/:accountId/transaction/upload',
        component: TransactionUploadComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.accountTransaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
    /*,
    {
        path: 'finance-account/:accountId/transaction',
        component: TransactionComponent,
        resolve: {
            'pagingParams': TransactionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.accountTransaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }*/
    /*, {
        path: 'transaction/:id',
        component: TransactionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.accountTransaction.home.title'
        },
        canActivate: [UserRouteAccessService]
    }*/
];

export const transactionPopupRoute: Routes = [
    {
        path: 'finance-account/:accountId/transaction-new',
        component: TransactionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.accountTransaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'finance-account/:accountId/transaction/:id/edit',
        component: TransactionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.accountTransaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'finance-account/:accountId/account-transaction/:id/delete',
        component: TransactionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfWebClientApp.accountTransaction.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
