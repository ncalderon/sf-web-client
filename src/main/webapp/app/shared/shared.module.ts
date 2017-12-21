import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    SfServicesModule,
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
    DatetimeService
} from './';

@NgModule({
    imports: [
        SfServicesModule,
        SfWebClientSharedLibsModule,
        SfWebClientSharedCommonModule
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
        SfServicesModule,
        SfWebClientSharedCommonModule,
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SfWebClientSharedModule {}
