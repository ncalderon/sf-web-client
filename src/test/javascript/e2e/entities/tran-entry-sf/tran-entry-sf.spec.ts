import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TranEntryComponentsPage, TranEntryUpdatePage } from './tran-entry-sf.page-object';

describe('TranEntry e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let tranEntryUpdatePage: TranEntryUpdatePage;
    let tranEntryComponentsPage: TranEntryComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TranEntries', async () => {
        await navBarPage.goToEntity('tran-entry-sf');
        tranEntryComponentsPage = new TranEntryComponentsPage();
        expect(await tranEntryComponentsPage.getTitle()).toMatch(/sfwebApp.tranEntry.home.title/);
    });

    it('should load create TranEntry page', async () => {
        await tranEntryComponentsPage.clickOnCreateButton();
        tranEntryUpdatePage = new TranEntryUpdatePage();
        expect(await tranEntryUpdatePage.getPageTitle()).toMatch(/sfwebApp.tranEntry.home.createOrEditLabel/);
        await tranEntryUpdatePage.cancel();
    });

    /* it('should create and save TranEntries', async () => {
        await tranEntryComponentsPage.clickOnCreateButton();
        await tranEntryUpdatePage.tranTypeSelectLastOption();
        await tranEntryUpdatePage.setTranNumInput('tranNum');
        expect(await tranEntryUpdatePage.getTranNumInput()).toMatch('tranNum');
        await tranEntryUpdatePage.setRefNumInput('refNum');
        expect(await tranEntryUpdatePage.getRefNumInput()).toMatch('refNum');
        await tranEntryUpdatePage.setPostDateInput('2000-12-31');
        expect(await tranEntryUpdatePage.getPostDateInput()).toMatch('2000-12-31');
        await tranEntryUpdatePage.setDescriptionInput('description');
        expect(await tranEntryUpdatePage.getDescriptionInput()).toMatch('description');
        await tranEntryUpdatePage.setAmountInput('5');
        expect(await tranEntryUpdatePage.getAmountInput()).toMatch('5');
        await tranEntryUpdatePage.setCcyValInput('5');
        expect(await tranEntryUpdatePage.getCcyValInput()).toMatch('5');
        await tranEntryUpdatePage.setCcyCodeInput('ccyCode');
        expect(await tranEntryUpdatePage.getCcyCodeInput()).toMatch('ccyCode');
        await tranEntryUpdatePage.paymentMethodSelectLastOption();
        await tranEntryUpdatePage.userSelectLastOption();
        await tranEntryUpdatePage.finAccSelectLastOption();
        await tranEntryUpdatePage.tranCategorySelectLastOption();
        await tranEntryUpdatePage.save();
        expect(await tranEntryUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
