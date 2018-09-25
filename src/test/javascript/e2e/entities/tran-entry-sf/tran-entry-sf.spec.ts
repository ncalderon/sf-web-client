/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TranEntryComponentsPage, TranEntryDeleteDialog, TranEntryUpdatePage } from './tran-entry-sf.page-object';

const expect = chai.expect;

describe('TranEntry e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let tranEntryUpdatePage: TranEntryUpdatePage;
    let tranEntryComponentsPage: TranEntryComponentsPage;
    /*let tranEntryDeleteDialog: TranEntryDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TranEntries', async () => {
        await navBarPage.goToEntity('tran-entry-sf');
        tranEntryComponentsPage = new TranEntryComponentsPage();
        expect(await tranEntryComponentsPage.getTitle()).to.eq('sfwebApp.tranEntry.home.title');
    });

    it('should load create TranEntry page', async () => {
        await tranEntryComponentsPage.clickOnCreateButton();
        tranEntryUpdatePage = new TranEntryUpdatePage();
        expect(await tranEntryUpdatePage.getPageTitle()).to.eq('sfwebApp.tranEntry.home.createOrEditLabel');
        await tranEntryUpdatePage.cancel();
    });

    /* it('should create and save TranEntries', async () => {
        const nbButtonsBeforeCreate = await tranEntryComponentsPage.countDeleteButtons();

        await tranEntryComponentsPage.clickOnCreateButton();
        await tranEntryUpdatePage.tranTypeSelectLastOption();
        await tranEntryUpdatePage.setTranNumInput('tranNum');
        expect(await tranEntryUpdatePage.getTranNumInput()).to.eq('tranNum');
        await tranEntryUpdatePage.setRefNumInput('refNum');
        expect(await tranEntryUpdatePage.getRefNumInput()).to.eq('refNum');
        await tranEntryUpdatePage.setPostDateInput('2000-12-31');
        expect(await tranEntryUpdatePage.getPostDateInput()).to.eq('2000-12-31');
        await tranEntryUpdatePage.setDescriptionInput('description');
        expect(await tranEntryUpdatePage.getDescriptionInput()).to.eq('description');
        await tranEntryUpdatePage.setAmountInput('5');
        expect(await tranEntryUpdatePage.getAmountInput()).to.eq('5');
        await tranEntryUpdatePage.setCcyValInput('5');
        expect(await tranEntryUpdatePage.getCcyValInput()).to.eq('5');
        await tranEntryUpdatePage.setCcyCodeInput('ccyCode');
        expect(await tranEntryUpdatePage.getCcyCodeInput()).to.eq('ccyCode');
        await tranEntryUpdatePage.paymentMethodSelectLastOption();
        await tranEntryUpdatePage.userSelectLastOption();
        await tranEntryUpdatePage.finAccSelectLastOption();
        await tranEntryUpdatePage.tranCategorySelectLastOption();
        await tranEntryUpdatePage.save();
        expect(await tranEntryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await tranEntryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last TranEntry', async () => {
        const nbButtonsBeforeDelete = await tranEntryComponentsPage.countDeleteButtons();
        await tranEntryComponentsPage.clickOnLastDeleteButton();

        tranEntryDeleteDialog = new TranEntryDeleteDialog();
        expect(await tranEntryDeleteDialog.getDialogTitle())
            .to.eq('sfwebApp.tranEntry.delete.question');
        await tranEntryDeleteDialog.clickOnConfirmButton();

        expect(await tranEntryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
