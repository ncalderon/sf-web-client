import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CurrencyComponentsPage, CurrencyUpdatePage } from './currency-sf.page-object';

describe('Currency e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let currencyUpdatePage: CurrencyUpdatePage;
    let currencyComponentsPage: CurrencyComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Currencies', async () => {
        await navBarPage.goToEntity('currency-sf');
        currencyComponentsPage = new CurrencyComponentsPage();
        expect(await currencyComponentsPage.getTitle()).toMatch(/sfwebApp.currency.home.title/);
    });

    it('should load create Currency page', async () => {
        await currencyComponentsPage.clickOnCreateButton();
        currencyUpdatePage = new CurrencyUpdatePage();
        expect(await currencyUpdatePage.getPageTitle()).toMatch(/sfwebApp.currency.home.createOrEditLabel/);
        await currencyUpdatePage.cancel();
    });

    it('should create and save Currencies', async () => {
        await currencyComponentsPage.clickOnCreateButton();
        await currencyUpdatePage.setCodeInput('code');
        expect(await currencyUpdatePage.getCodeInput()).toMatch('code');
        await currencyUpdatePage.setNameInput('name');
        expect(await currencyUpdatePage.getNameInput()).toMatch('name');
        const selectedIsDefault = currencyUpdatePage.getIsDefaultInput();
        if (await selectedIsDefault.isSelected()) {
            await currencyUpdatePage.getIsDefaultInput().click();
            expect(await currencyUpdatePage.getIsDefaultInput().isSelected()).toBeFalsy();
        } else {
            await currencyUpdatePage.getIsDefaultInput().click();
            expect(await currencyUpdatePage.getIsDefaultInput().isSelected()).toBeTruthy();
        }
        await currencyUpdatePage.setJsonvalInput('jsonval');
        expect(await currencyUpdatePage.getJsonvalInput()).toMatch('jsonval');
        await currencyUpdatePage.save();
        expect(await currencyUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
