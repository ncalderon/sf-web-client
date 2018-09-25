/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserPreferenceComponentsPage, UserPreferenceDeleteDialog, UserPreferenceUpdatePage } from './user-preference-sf.page-object';

const expect = chai.expect;

describe('UserPreference e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let userPreferenceUpdatePage: UserPreferenceUpdatePage;
    let userPreferenceComponentsPage: UserPreferenceComponentsPage;
    /*let userPreferenceDeleteDialog: UserPreferenceDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load UserPreferences', async () => {
        await navBarPage.goToEntity('user-preference-sf');
        userPreferenceComponentsPage = new UserPreferenceComponentsPage();
        expect(await userPreferenceComponentsPage.getTitle()).to.eq('sfwebApp.userPreference.home.title');
    });

    it('should load create UserPreference page', async () => {
        await userPreferenceComponentsPage.clickOnCreateButton();
        userPreferenceUpdatePage = new UserPreferenceUpdatePage();
        expect(await userPreferenceUpdatePage.getPageTitle()).to.eq('sfwebApp.userPreference.home.createOrEditLabel');
        await userPreferenceUpdatePage.cancel();
    });

    /* it('should create and save UserPreferences', async () => {
        const nbButtonsBeforeCreate = await userPreferenceComponentsPage.countDeleteButtons();

        await userPreferenceComponentsPage.clickOnCreateButton();
        await userPreferenceUpdatePage.setValueInput('value');
        expect(await userPreferenceUpdatePage.getValueInput()).to.eq('value');
        await userPreferenceUpdatePage.userSelectLastOption();
        await userPreferenceUpdatePage.preferenceSelectLastOption();
        await userPreferenceUpdatePage.save();
        expect(await userPreferenceUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await userPreferenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last UserPreference', async () => {
        const nbButtonsBeforeDelete = await userPreferenceComponentsPage.countDeleteButtons();
        await userPreferenceComponentsPage.clickOnLastDeleteButton();

        userPreferenceDeleteDialog = new UserPreferenceDeleteDialog();
        expect(await userPreferenceDeleteDialog.getDialogTitle())
            .to.eq('sfwebApp.userPreference.delete.question');
        await userPreferenceDeleteDialog.clickOnConfirmButton();

        expect(await userPreferenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
