import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranEntrySf } from 'app/shared/model/tran-entry-sf.model';
import { TranEntrySfService } from './tran-entry-sf.service';
import { TranEntrySfComponent } from './tran-entry-sf.component';
import { TranEntrySfDetailComponent } from './tran-entry-sf-detail.component';
import { TranEntrySfUpdateComponent } from './tran-entry-sf-update.component';
import { TranEntrySfDeletePopupComponent } from './tran-entry-sf-delete-dialog.component';
import { ITranEntrySf } from 'app/shared/model/tran-entry-sf.model';

@Injectable({ providedIn: 'root' })
export class TranEntrySfResolve implements Resolve<ITranEntrySf> {
    constructor(private service: TranEntrySfService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((tranEntry: HttpResponse<TranEntrySf>) => tranEntry.body));
        }
        return of(new TranEntrySf());
    }
}

export const tranEntryRoute: Routes = [
    {
        path: 'tran-entry-sf',
        component: TranEntrySfComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'sfwebApp.tranEntry.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tran-entry-sf/:id/view',
        component: TranEntrySfDetailComponent,
        resolve: {
            tranEntry: TranEntrySfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.tranEntry.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tran-entry-sf/new',
        component: TranEntrySfUpdateComponent,
        resolve: {
            tranEntry: TranEntrySfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.tranEntry.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tran-entry-sf/:id/edit',
        component: TranEntrySfUpdateComponent,
        resolve: {
            tranEntry: TranEntrySfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.tranEntry.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tranEntryPopupRoute: Routes = [
    {
        path: 'tran-entry-sf/:id/delete',
        component: TranEntrySfDeletePopupComponent,
        resolve: {
            tranEntry: TranEntrySfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.tranEntry.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
