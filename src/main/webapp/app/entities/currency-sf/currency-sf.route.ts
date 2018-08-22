import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrencySf } from 'app/shared/model/currency-sf.model';
import { CurrencySfService } from './currency-sf.service';
import { CurrencySfComponent } from './currency-sf.component';
import { CurrencySfDetailComponent } from './currency-sf-detail.component';
import { CurrencySfUpdateComponent } from './currency-sf-update.component';
import { CurrencySfDeletePopupComponent } from './currency-sf-delete-dialog.component';
import { ICurrencySf } from 'app/shared/model/currency-sf.model';

@Injectable({ providedIn: 'root' })
export class CurrencySfResolve implements Resolve<ICurrencySf> {
    constructor(private service: CurrencySfService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((currency: HttpResponse<CurrencySf>) => currency.body));
        }
        return of(new CurrencySf());
    }
}

export const currencyRoute: Routes = [
    {
        path: 'currency-sf',
        component: CurrencySfComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'sfwebApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'currency-sf/:id/view',
        component: CurrencySfDetailComponent,
        resolve: {
            currency: CurrencySfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'currency-sf/new',
        component: CurrencySfUpdateComponent,
        resolve: {
            currency: CurrencySfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'currency-sf/:id/edit',
        component: CurrencySfUpdateComponent,
        resolve: {
            currency: CurrencySfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const currencyPopupRoute: Routes = [
    {
        path: 'currency-sf/:id/delete',
        component: CurrencySfDeletePopupComponent,
        resolve: {
            currency: CurrencySfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
