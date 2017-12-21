import { Component, OnInit } from '@angular/core';
import {JhiAlertService, JhiLanguageService} from 'ng-jhipster';

import {Principal, AccountService, JhiLanguageHelper, ResponseWrapper} from '../../shared';
import {Currency} from '../../sf-entities/currency';
import {CurrencyService} from '../../shared/sf-services/currency';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];
    currencies: Currency[];

    constructor(
        private account: AccountService,
        private currencyService: CurrencyService,
        private principal: Principal,
        private languageService: JhiLanguageService,
        private alertService: JhiAlertService,
        private languageHelper: JhiLanguageHelper
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
        });
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
            console.log(this.languages);
        });
        this.currencyService.query().subscribe((res: ResponseWrapper) => { this.currencies = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    save() {
        this.account.save(this.settingsAccount).subscribe(() => {
            this.error = null;
            this.success = 'OK';
            this.principal.identity(true).then((account) => {
                this.settingsAccount = this.copyAccount(account);
            });
            this.languageService.getCurrent().then((current) => {
                if (this.settingsAccount.langKey !== current) {
                    this.languageService.changeLanguage(this.settingsAccount.langKey);
                }
            });
        }, () => {
            this.success = null;
            this.error = 'ERROR';
        });
    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl,
            currency: account.currency
        };
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }
}
