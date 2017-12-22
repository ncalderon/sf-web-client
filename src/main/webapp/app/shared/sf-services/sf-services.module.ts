import {NgModule} from '@angular/core';
import { SfBankModule, SfFinanceAccountModule, SfTranCategoryRegexModule, SfCurrencyModule, SfTranCategoryModule, SfAccountTransactionModule } from  './'

@NgModule({
    imports: [
        SfBankModule, SfFinanceAccountModule, SfTranCategoryRegexModule, SfCurrencyModule, SfTranCategoryModule, SfAccountTransactionModule
    ],
    exports: [SfBankModule, SfFinanceAccountModule, SfTranCategoryRegexModule, SfCurrencyModule, SfTranCategoryModule, SfAccountTransactionModule]
})
export class SfServicesModule {}
