import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TranCategoryComponentsPage, TranCategoryUpdatePage } from './tran-category-sf.page-object';

describe('TranCategory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let tranCategoryUpdatePage: TranCategoryUpdatePage;
    let tranCategoryComponentsPage: TranCategoryComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load TranCategories', async () => {
        await navBarPage.goToEntity('tran-category-sf');
        tranCategoryComponentsPage = new TranCategoryComponentsPage();
        expect(await tranCategoryComponentsPage.getTitle()).toMatch(/sfwebApp.tranCategory.home.title/);
    });

    it('should load create TranCategory page', async () => {
        await tranCategoryComponentsPage.clickOnCreateButton();
        tranCategoryUpdatePage = new TranCategoryUpdatePage();
        expect(await tranCategoryUpdatePage.getPageTitle()).toMatch(/sfwebApp.tranCategory.home.createOrEditLabel/);
        await tranCategoryUpdatePage.cancel();
    });

    /* it('should create and save TranCategories', async () => {
        await tranCategoryComponentsPage.clickOnCreateButton();
        await tranCategoryUpdatePage.setNameInput('name');
        expect(await tranCategoryUpdatePage.getNameInput()).toMatch('name');
        await tranCategoryUpdatePage.setDescriptionInput('description');
        expect(await tranCategoryUpdatePage.getDescriptionInput()).toMatch('description');
        await tranCategoryUpdatePage.userSelectLastOption();
        await tranCategoryUpdatePage.save();
        expect(await tranCategoryUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
