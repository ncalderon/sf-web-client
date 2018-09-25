/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CurrencyComponentsPage, CurrencyDeleteDialog, CurrencyUpdatePage } from './currency-sf.page-object';

const expect = chai.expect;

describe('Currency e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let currencyUpdatePage: CurrencyUpdatePage;
    let currencyComponentsPage: CurrencyComponentsPage;
    let currencyDeleteDialog: CurrencyDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Currencies', async () => {
        await navBarPage.goToEntity('currency-sf');
        currencyComponentsPage = new CurrencyComponentsPage();
        expect(await currencyComponentsPage.getTitle()).to.eq('sfwebApp.currency.home.title');
    });

    it('should load create Currency page', async () => {
        await currencyComponentsPage.clickOnCreateButton();
        currencyUpdatePage = new CurrencyUpdatePage();
        expect(await currencyUpdatePage.getPageTitle()).to.eq('sfwebApp.currency.home.createOrEditLabel');
        await currencyUpdatePage.cancel();
    });

    it('should create and save Currencies', async () => {
        const nbButtonsBeforeCreate = await currencyComponentsPage.countDeleteButtons();

        await currencyComponentsPage.clickOnCreateButton();
        await currencyUpdatePage.setCodeInput('code');
        expect(await currencyUpdatePage.getCodeInput()).to.eq('code');
        await currencyUpdatePage.setNameInput('name');
        expect(await currencyUpdatePage.getNameInput()).to.eq('name');
        const selectedIsDefault = currencyUpdatePage.getIsDefaultInput();
        if (await selectedIsDefault.isSelected()) {
            await currencyUpdatePage.getIsDefaultInput().click();
            expect(await currencyUpdatePage.getIsDefaultInput().isSelected()).to.be.false;
        } else {
            await currencyUpdatePage.getIsDefaultInput().click();
            expect(await currencyUpdatePage.getIsDefaultInput().isSelected()).to.be.true;
        }
        await currencyUpdatePage.setJsonvalInput('jsonval');
        expect(await currencyUpdatePage.getJsonvalInput()).to.eq('jsonval');
        await currencyUpdatePage.save();
        expect(await currencyUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await currencyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Currency', async () => {
        const nbButtonsBeforeDelete = await currencyComponentsPage.countDeleteButtons();
        await currencyComponentsPage.clickOnLastDeleteButton();

        currencyDeleteDialog = new CurrencyDeleteDialog();
        expect(await currencyDeleteDialog.getDialogTitle()).to.eq('sfwebApp.currency.delete.question');
        await currencyDeleteDialog.clickOnConfirmButton();

        expect(await currencyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
