/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FinAccComponentsPage, FinAccDeleteDialog, FinAccUpdatePage } from './fin-acc-sf.page-object';

const expect = chai.expect;

describe('FinAcc e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let finAccUpdatePage: FinAccUpdatePage;
    let finAccComponentsPage: FinAccComponentsPage;
    /*let finAccDeleteDialog: FinAccDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load FinAccs', async () => {
        await navBarPage.goToEntity('fin-acc-sf');
        finAccComponentsPage = new FinAccComponentsPage();
        expect(await finAccComponentsPage.getTitle()).to.eq('sfwebApp.finAcc.home.title');
    });

    it('should load create FinAcc page', async () => {
        await finAccComponentsPage.clickOnCreateButton();
        finAccUpdatePage = new FinAccUpdatePage();
        expect(await finAccUpdatePage.getPageTitle()).to.eq('sfwebApp.finAcc.home.createOrEditLabel');
        await finAccUpdatePage.cancel();
    });

    /* it('should create and save FinAccs', async () => {
        const nbButtonsBeforeCreate = await finAccComponentsPage.countDeleteButtons();

        await finAccComponentsPage.clickOnCreateButton();
        await finAccUpdatePage.statusSelectLastOption();
        await finAccUpdatePage.setAccNumInput('accNum');
        expect(await finAccUpdatePage.getAccNumInput()).to.eq('accNum');
        await finAccUpdatePage.setNameInput('name');
        expect(await finAccUpdatePage.getNameInput()).to.eq('name');
        await finAccUpdatePage.setDescriptionInput('description');
        expect(await finAccUpdatePage.getDescriptionInput()).to.eq('description');
        await finAccUpdatePage.setBalanceInput('5');
        expect(await finAccUpdatePage.getBalanceInput()).to.eq('5');
        const selectedIsCreditCard = finAccUpdatePage.getIsCreditCardInput();
        if (await selectedIsCreditCard.isSelected()) {
            await finAccUpdatePage.getIsCreditCardInput().click();
            expect(await finAccUpdatePage.getIsCreditCardInput().isSelected()).to.be.false;
        } else {
            await finAccUpdatePage.getIsCreditCardInput().click();
            expect(await finAccUpdatePage.getIsCreditCardInput().isSelected()).to.be.true;
        }
        await finAccUpdatePage.setDueDateInput('2000-12-31');
        expect(await finAccUpdatePage.getDueDateInput()).to.eq('2000-12-31');
        await finAccUpdatePage.setClosingDateInput('2000-12-31');
        expect(await finAccUpdatePage.getClosingDateInput()).to.eq('2000-12-31');
        await finAccUpdatePage.userSelectLastOption();
        await finAccUpdatePage.save();
        expect(await finAccUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await finAccComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last FinAcc', async () => {
        const nbButtonsBeforeDelete = await finAccComponentsPage.countDeleteButtons();
        await finAccComponentsPage.clickOnLastDeleteButton();

        finAccDeleteDialog = new FinAccDeleteDialog();
        expect(await finAccDeleteDialog.getDialogTitle())
            .to.eq('sfwebApp.finAcc.delete.question');
        await finAccDeleteDialog.clickOnConfirmButton();

        expect(await finAccComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
