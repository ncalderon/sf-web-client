import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PreferenceSf } from 'app/shared/model/preference-sf.model';
import { PreferenceSfService } from './preference-sf.service';
import { PreferenceSfComponent } from './preference-sf.component';
import { PreferenceSfDetailComponent } from './preference-sf-detail.component';
import { PreferenceSfUpdateComponent } from './preference-sf-update.component';
import { PreferenceSfDeletePopupComponent } from './preference-sf-delete-dialog.component';
import { IPreferenceSf } from 'app/shared/model/preference-sf.model';

@Injectable({ providedIn: 'root' })
export class PreferenceSfResolve implements Resolve<IPreferenceSf> {
    constructor(private service: PreferenceSfService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((preference: HttpResponse<PreferenceSf>) => preference.body));
        }
        return of(new PreferenceSf());
    }
}

export const preferenceRoute: Routes = [
    {
        path: 'preference-sf',
        component: PreferenceSfComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'sfwebApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'preference-sf/:id/view',
        component: PreferenceSfDetailComponent,
        resolve: {
            preference: PreferenceSfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'preference-sf/new',
        component: PreferenceSfUpdateComponent,
        resolve: {
            preference: PreferenceSfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'preference-sf/:id/edit',
        component: PreferenceSfUpdateComponent,
        resolve: {
            preference: PreferenceSfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const preferencePopupRoute: Routes = [
    {
        path: 'preference-sf/:id/delete',
        component: PreferenceSfDeletePopupComponent,
        resolve: {
            preference: PreferenceSfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.preference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
