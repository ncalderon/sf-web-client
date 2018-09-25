import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FinAccComponentsPage, FinAccUpdatePage } from './fin-acc-sf.page-object';

describe('FinAcc e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let finAccUpdatePage: FinAccUpdatePage;
    let finAccComponentsPage: FinAccComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load FinAccs', async () => {
        await navBarPage.goToEntity('fin-acc-sf');
        finAccComponentsPage = new FinAccComponentsPage();
        expect(await finAccComponentsPage.getTitle()).toMatch(/sfwebApp.finAcc.home.title/);
    });

    it('should load create FinAcc page', async () => {
        await finAccComponentsPage.clickOnCreateButton();
        finAccUpdatePage = new FinAccUpdatePage();
        expect(await finAccUpdatePage.getPageTitle()).toMatch(/sfwebApp.finAcc.home.createOrEditLabel/);
        await finAccUpdatePage.cancel();
    });

    /* it('should create and save FinAccs', async () => {
        await finAccComponentsPage.clickOnCreateButton();
        await finAccUpdatePage.statusSelectLastOption();
        await finAccUpdatePage.setAccNumInput('accNum');
        expect(await finAccUpdatePage.getAccNumInput()).toMatch('accNum');
        await finAccUpdatePage.setNameInput('name');
        expect(await finAccUpdatePage.getNameInput()).toMatch('name');
        await finAccUpdatePage.setDescriptionInput('description');
        expect(await finAccUpdatePage.getDescriptionInput()).toMatch('description');
        await finAccUpdatePage.setBalanceInput('5');
        expect(await finAccUpdatePage.getBalanceInput()).toMatch('5');
        const selectedIsCreditCard = finAccUpdatePage.getIsCreditCardInput();
        if (await selectedIsCreditCard.isSelected()) {
            await finAccUpdatePage.getIsCreditCardInput().click();
            expect(await finAccUpdatePage.getIsCreditCardInput().isSelected()).toBeFalsy();
        } else {
            await finAccUpdatePage.getIsCreditCardInput().click();
            expect(await finAccUpdatePage.getIsCreditCardInput().isSelected()).toBeTruthy();
        }
        await finAccUpdatePage.setDueDateInput('2000-12-31');
        expect(await finAccUpdatePage.getDueDateInput()).toMatch('2000-12-31');
        await finAccUpdatePage.setClosingDateInput('2000-12-31');
        expect(await finAccUpdatePage.getClosingDateInput()).toMatch('2000-12-31');
        await finAccUpdatePage.userSelectLastOption();
        await finAccUpdatePage.save();
        expect(await finAccUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
