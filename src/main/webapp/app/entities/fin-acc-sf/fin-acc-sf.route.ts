import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FinAccSf } from 'app/shared/model/fin-acc-sf.model';
import { FinAccSfService } from './fin-acc-sf.service';
import { FinAccSfComponent } from './fin-acc-sf.component';
import { FinAccSfDetailComponent } from './fin-acc-sf-detail.component';
import { FinAccSfUpdateComponent } from './fin-acc-sf-update.component';
import { FinAccSfDeletePopupComponent } from './fin-acc-sf-delete-dialog.component';
import { IFinAccSf } from 'app/shared/model/fin-acc-sf.model';

@Injectable({ providedIn: 'root' })
export class FinAccSfResolve implements Resolve<IFinAccSf> {
    constructor(private service: FinAccSfService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((finAcc: HttpResponse<FinAccSf>) => finAcc.body));
        }
        return of(new FinAccSf());
    }
}

export const finAccRoute: Routes = [
    {
        path: 'fin-acc-sf',
        component: FinAccSfComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'sfwebApp.finAcc.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fin-acc-sf/:id/view',
        component: FinAccSfDetailComponent,
        resolve: {
            finAcc: FinAccSfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.finAcc.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fin-acc-sf/new',
        component: FinAccSfUpdateComponent,
        resolve: {
            finAcc: FinAccSfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.finAcc.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fin-acc-sf/:id/edit',
        component: FinAccSfUpdateComponent,
        resolve: {
            finAcc: FinAccSfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.finAcc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const finAccPopupRoute: Routes = [
    {
        path: 'fin-acc-sf/:id/delete',
        component: FinAccSfDeletePopupComponent,
        resolve: {
            finAcc: FinAccSfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.finAcc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
