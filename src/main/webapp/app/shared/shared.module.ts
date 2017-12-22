import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    SfWebClientSharedLibsModule,
    SfWebClientSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    Principal,
    HasAnyAuthorityDirective,
    JhiSocialComponent,
    SocialService,
    JhiLoginModalComponent,
    LoggerService,
    DatetimeService,
    SfServicesModule
} from './';

@NgModule({
    imports: [
        SfWebClientSharedLibsModule,
        SfWebClientSharedCommonModule,
        SfServicesModule
    ],
    declarations: [
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        SocialService,
        UserService,
        DatePipe,
        LoggerService,
        DatetimeService
        /*forwardRef(() => LoggerService)*/
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        SfWebClientSharedCommonModule,
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfWebClientSharedModule {}
