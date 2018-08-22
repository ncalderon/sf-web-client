import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserPreferenceSf } from 'app/shared/model/user-preference-sf.model';
import { UserPreferenceSfService } from './user-preference-sf.service';
import { UserPreferenceSfComponent } from './user-preference-sf.component';
import { UserPreferenceSfDetailComponent } from './user-preference-sf-detail.component';
import { UserPreferenceSfUpdateComponent } from './user-preference-sf-update.component';
import { UserPreferenceSfDeletePopupComponent } from './user-preference-sf-delete-dialog.component';
import { IUserPreferenceSf } from 'app/shared/model/user-preference-sf.model';

@Injectable({ providedIn: 'root' })
export class UserPreferenceSfResolve implements Resolve<IUserPreferenceSf> {
    constructor(private service: UserPreferenceSfService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((userPreference: HttpResponse<UserPreferenceSf>) => userPreference.body));
        }
        return of(new UserPreferenceSf());
    }
}

export const userPreferenceRoute: Routes = [
    {
        path: 'user-preference-sf',
        component: UserPreferenceSfComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'sfwebApp.userPreference.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-preference-sf/:id/view',
        component: UserPreferenceSfDetailComponent,
        resolve: {
            userPreference: UserPreferenceSfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.userPreference.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-preference-sf/new',
        component: UserPreferenceSfUpdateComponent,
        resolve: {
            userPreference: UserPreferenceSfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.userPreference.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-preference-sf/:id/edit',
        component: UserPreferenceSfUpdateComponent,
        resolve: {
            userPreference: UserPreferenceSfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.userPreference.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userPreferencePopupRoute: Routes = [
    {
        path: 'user-preference-sf/:id/delete',
        component: UserPreferenceSfDeletePopupComponent,
        resolve: {
            userPreference: UserPreferenceSfResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfwebApp.userPreference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
