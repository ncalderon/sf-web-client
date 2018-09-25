/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TranCategoryComponentsPage, TranCategoryDeleteDialog, TranCategoryUpdatePage } from './tran-category-sf.page-object';

const expect = chai.expect;

describe('TranCategory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let tranCategoryUpdatePage: TranCategoryUpdatePage;
    let tranCategoryComponentsPage: TranCategoryComponentsPage;
    /*let tranCategoryDeleteDialog: TranCategoryDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TranCategories', async () => {
        await navBarPage.goToEntity('tran-category-sf');
        tranCategoryComponentsPage = new TranCategoryComponentsPage();
        expect(await tranCategoryComponentsPage.getTitle()).to.eq('sfwebApp.tranCategory.home.title');
    });

    it('should load create TranCategory page', async () => {
        await tranCategoryComponentsPage.clickOnCreateButton();
        tranCategoryUpdatePage = new TranCategoryUpdatePage();
        expect(await tranCategoryUpdatePage.getPageTitle()).to.eq('sfwebApp.tranCategory.home.createOrEditLabel');
        await tranCategoryUpdatePage.cancel();
    });

    /* it('should create and save TranCategories', async () => {
        const nbButtonsBeforeCreate = await tranCategoryComponentsPage.countDeleteButtons();

        await tranCategoryComponentsPage.clickOnCreateButton();
        await tranCategoryUpdatePage.setNameInput('name');
        expect(await tranCategoryUpdatePage.getNameInput()).to.eq('name');
        await tranCategoryUpdatePage.setDescriptionInput('description');
        expect(await tranCategoryUpdatePage.getDescriptionInput()).to.eq('description');
        await tranCategoryUpdatePage.userSelectLastOption();
        await tranCategoryUpdatePage.save();
        expect(await tranCategoryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await tranCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last TranCategory', async () => {
        const nbButtonsBeforeDelete = await tranCategoryComponentsPage.countDeleteButtons();
        await tranCategoryComponentsPage.clickOnLastDeleteButton();

        tranCategoryDeleteDialog = new TranCategoryDeleteDialog();
        expect(await tranCategoryDeleteDialog.getDialogTitle())
            .to.eq('sfwebApp.tranCategory.delete.question');
        await tranCategoryDeleteDialog.clickOnConfirmButton();

        expect(await tranCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
