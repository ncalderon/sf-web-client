import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Ng2Webstorage } from 'ng2-webstorage';

import { SfWebClientSharedModule, UserRouteAccessService } from './shared';
import { SfWebClientHomeModule } from './home/home.module';
import { SfWebClientAdminModule } from './admin/admin.module';
import { SfWebClientAccountModule } from './account/account.module';

/*import { SfWebClientEntityModule } from './entities/entity.module';*/
import { SfWebClientEntityModule as AppSfWebClientEntityModule } from './sf-entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        SfWebClientSharedModule,
        SfWebClientHomeModule,
        SfWebClientAdminModule,
        SfWebClientAccountModule,
        /*SfWebClientEntityModule,*/
        // jhipster-needle-angular-add-module JHipster will add new module here
        AppSfWebClientEntityModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class SfWebClientAppModule {}
