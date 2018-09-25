import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { SfwebSharedLibsModule, SfwebSharedCommonModule, SfLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
    imports: [SfwebSharedLibsModule, SfwebSharedCommonModule],
    declarations: [SfLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [SfLoginModalComponent],
    exports: [SfwebSharedCommonModule, SfLoginModalComponent, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfwebSharedModule {}
