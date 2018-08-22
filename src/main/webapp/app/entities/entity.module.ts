import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SfwebPreferenceSfModule } from './preference-sf/preference-sf.module';
import { SfwebUserPreferenceSfModule } from './user-preference-sf/user-preference-sf.module';
import { SfwebCurrencySfModule } from './currency-sf/currency-sf.module';
import { SfwebFinAccSfModule } from './fin-acc-sf/fin-acc-sf.module';
import { SfwebTranCategorySfModule } from './tran-category-sf/tran-category-sf.module';
import { SfwebTranEntrySfModule } from './tran-entry-sf/tran-entry-sf.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        SfwebPreferenceSfModule,
        SfwebUserPreferenceSfModule,
        SfwebCurrencySfModule,
        SfwebFinAccSfModule,
        SfwebTranCategorySfModule,
        SfwebTranEntrySfModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SfwebEntityModule {}
