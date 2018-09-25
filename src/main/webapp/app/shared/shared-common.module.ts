import { NgModule } from '@angular/core';

import { SfwebSharedLibsModule, FindLanguageFromKeyPipe, SfAlertComponent, SfAlertErrorComponent } from './';

@NgModule({
    imports: [SfwebSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, SfAlertComponent, SfAlertErrorComponent],
    exports: [SfwebSharedLibsModule, FindLanguageFromKeyPipe, SfAlertComponent, SfAlertErrorComponent]
})
export class SfwebSharedCommonModule {}
